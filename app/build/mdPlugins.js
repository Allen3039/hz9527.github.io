const { getTitle, genMenu } = require('./myUtils.js')

function handlerSource (source) {
	let menu = genMenu(getTitle(source))
	return source.replace('<b', `${menu}<b`)
}

module.exports = handlerSource
