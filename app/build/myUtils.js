function getReg (className, tagName = 'b', group = false) {
	let parts = [
		`<${tagName}\\s+class\\s?=\\s?['"]\\s?${className}\\s?['"]\\s?>`,
		`.*?`,
		`<\\/${tagName}>`
	]
	return new RegExp((group ? '(' : '') + parts.join(group ? ')(' : '') + (group ? ')' : ''), 'g')
}

function getTags (className, str, tagName = 'b') {
	let reg = getReg(className, tagName, true)
	return (str.match(reg) || ['']).map(item => item.replace(reg, (sub, $1, $2) => $2))
}

function replaceTag (className, str, content, tagName = 'b') {
	return str.replace(getReg(className, str, tagName, true), (subStr, $1, $2, $3) => ($1 + content + $3))
}

function injectBefore (content, str, reg) {
	return str.replace(reg, subStr => (content + subStr))
}

function getTitle (str) {
	return str.match(/#+?\s+?.+?\n/g)
}

function genMenu (list) {
	let con = list.map(item => {
		let level = item.match(/#+/)[0].length
		let tit = item.replace(/(#+?\s+?)(.+?)(\n)/, '$2')
		return `<a href="#${tit}" class="level-${level} aside-menu-item">${tit}</a>`
	}).join('')
	return `<div class="aside-menu">
		<div class="aside-menu-tit" v-toggle>menu</div>
		<div class="aside-menu-con">${con}</div>
	</div>`
}

module.exports = {
	getReg,
	getTags,
	replaceTag,
	injectBefore,
	getTitle,
	genMenu
}
