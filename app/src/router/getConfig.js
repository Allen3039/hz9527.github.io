import config from './config.js'

const Config = process.env.NODE_ENV !== 'production' ? config : config.filter(item => item.show)

export default Config
