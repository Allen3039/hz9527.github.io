// 添加 menu 插件
// https://github.com/valeriangalliat/markdown-it-anchor
// 收集信息插件

const transTitleToId = (s) => encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-'))

const menuOpt = {
	headLevelChecker (level) {
		return level < 5
	},
	transTitleToId,
	genId (title, time) {
		return `${title}-${time + 1}`
	},
	getItemClassName (level) {
		return `level-${level} aside-menu-item`
	},
	render (Token, itemTokens) {
		return [
			Object.assign(new Token('html_block_open', 'div', 2), {
				attrs: [
					['class', 'aside-menu']
				]
			}),
			Object.assign(new Token('html_block_open', 'div', 1), {
				attrs: [
					['class', 'aside-menu-tit'],
					['v-toggle', '']
				],
				content: 'menu'
			}),
			new Token('html_block_close', 'div', -1),
			Object.assign(new Token('html_block_open', 'div', 1), {
				attrs: [
					['class', 'aside-menu-con']
				]
			}),
			...itemTokens,
			new Token('html_block_close', 'div', -1),
			new Token('html_block_close', 'div', -1)
		]
	}
}

function addMenuCore (md, opt) {
	const {headLevelChecker, transTitleToId, genId, getItemClassName, render} = opt
	md.core.ruler.push('addMenu', state => {
		const idAttrs = {}
		const tokens = state.tokens
		const idHandler = (title) => {
			let i = 0
			let res = genId(title, i)
			while (idAttrs[res]) {
				res = genId(title, ++i)
			}
			return res
		}
		tokens
			.filter(token => token.type === 'heading_open')
			.filter(token => headLevelChecker(Number(token.tag.substr(1))))
			.forEach(token => {
				const title = tokens[tokens.indexOf(token) + 1]
					.children
					.filter(token => token.type === 'text' || token.type === 'code_inline')
					.reduce((acc, t) => acc + t.content, '')

				let idAttr = token.attrGet('id')

				if (idAttr == null) {
					idAttr = idHandler(transTitleToId(title))
					token.attrPush(['id', idAttr])
				} else if (idAttrs[idAttr]) {
					idAttr = idHandler(transTitleToId(title))
					token.attrSet(['id', idAttr])
				}
				idAttrs[idAttr] = {
					title,
					level: Number(token.tag.substr(1))
				}
			})
		// append
		const genItemToken = (title, id, level) => [
			Object.assign(new state.Token('link_open', 'a', 1), {
				attrs: [
					['class', getItemClassName(level)],
					['href', `#${id}`]
				]
			}),
			Object.assign(new state.Token('html_block', '', 0), { content: title }),
			new state.Token('link_close', 'a', -1)
		]
		const list = Object.keys(idAttrs).reduce((res, id) => {
			const {title, level} = idAttrs[id]
			return res.concat(genItemToken(title, id, level))
		}, [])
		const container = render(state.Token, list)
		state.tokens.unshift(...container)
	})
}
exports.addMenuPlugin = function (md) {
	return addMenuCore(md, menuOpt)
}

exports.formatLinkPlugin = function (md) {
	md.core.ruler.push('formatLink', state => {
		state.tokens.filter(token => token.type === 'inline')
			.filter(tag => tag.children && tag.children.some(item => item.type === 'link_open'))
			.forEach(tag => {
				tag.children.forEach(token => {
					if (token.type === 'link_open') {
						// console.log(token)
					}
				})
			})
	})
}
