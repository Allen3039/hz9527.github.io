const path = require('path')
const fs = require('fs')

class Info {
	constructor (id) {
		this.id = id
		this.data = {}
	}
}
class Infos {
	constructor () {
		this.fileMap = new Map()
		this.curFile = null
		this.baseUrl = path.resolve(__dirname, '../../src/pages')
		this.target = path.resolve(__dirname, '../../src/router/config.js')
	}

	initFile (id) {
		this.fileMap.set(id, new Info(id))
	}
	setFile (id, data) {
		const info = this.fileMap.get(id)
		if (info) {
			info.data = {...info.data, data}
		}
	}

	setCurId (id) {
		this.curFile = id
	}

	renderFile () {
		const content = `export default = ${JSON.stringify(Array.from(this.fileMap.values()), undefined, 2)}`
		fs.writeFile(this.target, content)
	}

	resolveRoute (relativePath) {
		const id = path.resolve(this.curFile, '../', relativePath)
		const info = this.fileMap.get(id)
		if (info) {
			return info.time
		}
	}
}

const infos = new Infos()

module.exports = infos
