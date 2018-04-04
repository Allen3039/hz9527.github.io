// 生成markdown配置文件
const generator = require('./generator.js')

generator(process.env.NODE_ENV === 'production' ? 'build' : 'dev')