const infos = require('./info')

module.exports = function (src) {
	console.log(this.resource)
	infos.setFile(this.resource)
	return src
}
