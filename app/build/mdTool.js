const {getReg, getTags, replaceTag, injectBefore} = require('./myUtils.js')
const fs = require('fs')
const path = require('path')
const TYPE_CLASS = 'type'
const KW_CLASS = 'kw'
const TIME_CLASS = 'update-time'
const DIR_PATH = path.join(__dirname, '../src/pages')
const CONF_PATH = path.join(__dirname, '../src/router/config.js')

function handlerFile (filePath, shouldupdate = false) {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, (err, fd) => {
			if (err) reject(err)
			let str = fd.toString()
			// match title type time keyword
			let title = (str.match(/##\s*?.+?\n/) || [''])[0].replace(/(##\s*?)([^\s]+?)(\n)/, '$2')
			let type = getTags(TYPE_CLASS, str)[0]
			let tips = getTags(KW_CLASS, str)
			let time = getTags(TIME_CLASS, str)[0].replace(/({{\s*)(\d+)?(.+)?/, '$2')
			let now = Date.now()
			if (type && tips && (!time || (shouldupdate && (now - Number(time) > 1000 * 60)))) {
				// set time
				let con = `<b class="${TIME_CLASS}">{{${now} | formatTime}}</b>`
				let newStr = time ? replaceTag(TIME_CLASS, str, con) : injectBefore(con, str, getReg(TYPE_CLASS))
				fs.writeFile(filePath, newStr, err => {
					err ? reject(err) : resolve({title, type, tips, time: now, file: filePath})
				})
			} else {
				resolve({title, type, tips, time, file: filePath})
			}
		})
	})
}

function walkArr (arr) {
	let result = []
	if (arr && arr.constructor === Array) {
		arr.forEach(item => {
			result = result.concat(walkArr(item))
		})
	} else {
		result.push(arr)
	}
	return result
}

async function walkDir (dir) {
	let result = []
	if (fs.existsSync(dir)) {
		if (fs.statSync(dir).isDirectory()) {
			// 判断文件是md
			let list = await Promise.all(fs.readdirSync(dir).map(file => walkDir(`${dir}/${file}`)))
			result = result.concat(walkArr(list))
		} else if (/\.md$/.test(dir)) {
			let info = await handlerFile(dir)
			result.push([info])
		}
	}
	return result
}

function getFile (filePath) {
	return filePath.replace(/(.+?\/src\/pages\/)(.+\.md)/, '$2')
}

function genConfItem ({title, type, tips, time, file}) {
	tips = (tips || ['']).join('\', \'')
	file = getFile(file)
	return `{title: '${title}', type: '${type}', tips: ['${tips}'], time: ${time}, file: '${file}'}`
}

function genConfig (infoList, filePath = CONF_PATH) {
	return new Promise((resolve, reject) => {
		let con = infoList.map(genConfItem).join(',\n\t')
		fs.writeFile(filePath, `export default [\n\t${con}\n]\n`, err => {
			err ? reject(err) : resolve()
		})
	})
}

function operConf (oper, info) {
	return new Promise((resolve, reject) => {
		fs.readFile(CONF_PATH, (err, fd) => {
			if (err) reject(err)
			let str = fd.toString()
			let reg = new RegExp(`,*?\n\\t{.+?file:\\s*?["']${getFile(info.file)}["']\\s*?}`)
			let newStr
			if (oper === 'delete') {
				newStr = str.replace(reg, '')
			} else if (oper === 'update') {
				let item = str.match(reg)
				if (!item) {
					newStr = str.replace(/},*?\s]/, `},\n\t${genConfItem(info)}\n]`)
				} else {
					let ind = item[0][0] === ',' ? ',\n\t' : '\n\t'
					newStr = str.replace(item[0], ind + genConfItem(info))
				}
			}
			if (newStr !== str) {
				fs.writeFile(CONF_PATH, newStr, err => err ? reject(err) : resolve())
			} else {
				resolve()
			}
		})
	})
}

module.exports = function (env) {
	let nameSet = new Set()
	if (env === 'dev') {
		fs.watch(DIR_PATH, (type, file) => {
			if (type === 'rename') { // rename maybe add remove rename file, so can remove,del in config
				if (nameSet.has(file)) { // rename or del. remove in config
					nameSet.delete(file)
					operConf('delete', {file})
				} else {
					nameSet.add(file)
				}
			} else if (type === 'change') {
				handlerFile(`${DIR_PATH}/${file}`, true)
					.then(info => {
						// inset or change it in config
						if (info.tips && info.type) operConf('update', info)
					})
					.catch(err => console.log(err))
			}
		})
	}
	return walkDir(DIR_PATH)
		.then(list => {
			nameSet = new Set(list.map(item => getFile(item.file)))
			// set config
			return genConfig(list)
		})
}
