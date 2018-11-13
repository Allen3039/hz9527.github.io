const { getTitle, genMenu } = require('./myUtils.js')

// 方案1 根据 # 匹配标题，结果发现在 sh 代码块中也有 #
function handlerSource (source) {
	let menu = genMenu(getTitle(source))
	return source.replace('<b', `${menu}<b`)
}

// code_block: [Function],
// fence: [Function],
// image: [Function],
// hardbreak: [Function],
// softbreak: [Function],
// text: [Function],
// html_block: [Function],
// html_inline: [Function] }
// let isFirst = false
// function handlerMd (mdIt, source) {
// 	const Titles = []
// 	const defaultRender = mdIt.renderer.rules.fence
// 	mdIt.renderer.rules.fence = function (tokens, idx, options, env, self) {
// 		let item
// 		if (!isFirst) {
// 			isFirst = true
// 			console.log(tokens[0].attrs)
// 		}
// 		tokens.forEach(token => {
// 			if (token.type === 'heading_open' && /h\d/.test(token.tag)) {
// 				item = token.attrs[0][1]
// 				console.log(item)
// 			}
// 		})
// 		// pass token to default renderer.
// 		return defaultRender(tokens, idx, options, env, self)
// 	}
// 	// Promise.resolve(Titles)
// 	// 	.then(res => console.log(res))
// 	let menu = genMenu(Titles)
// 	return source.replace('<b', `${menu}<b`)
// }

module.exports = handlerSource
