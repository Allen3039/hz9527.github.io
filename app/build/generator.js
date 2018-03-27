const fs = require('fs')
const path = require('path')
const process = require('process')

function handler (file, callback) {
  if ((file && /.\md$/.test(file)) || file === void 0) {
    fs.readdir(path.join(__dirname, '../src/pages'), (err, files) => {
      Promise.all(files.filter(file => /.\md$/.test(file))
        .map(file => new Promise((resolve, reject) => {
          let p = path.join(__dirname, `../src/pages/${file}`)
          fs.readFile(p, (err, fd) => {
            if (err) reject(err)
            let str = fd.toString()
            // 匹配标题 & type & keyword & 修改时间
            let title = str.match(/##.+\n/, /.+/)
            title = (title || [''])[0].replace(/##\s*/, '').replace(/\n/, '')
            let type = str.match(/<b\s+class\s?=\s?['"]\s?type\s?['"]\s?>.+?<\/b>/g)
            type = (type || [''])[0].replace(/<b\s+class\s?=\s?['"]\s?type\s?['"]\s?>/, '').replace('</b>', '')
            let tips = str.match(/<b\s+class\s?=\s?['"]\s?kw\s?['"]\s?>.+?<\/b>/g)
            tips = (tips || ['']).map(item => item.replace(/<b\s+class\s?=\s?['"]\s?kw\s?['"]\s?>/, '').replace('</b>', ''))
            let time = +fs.statSync(p).ctime
            resolve({title, type, tips, time})
          })
        }))).then(resList => {
          resList.sort((pre, next) => pre.time - next.time)
          let str = `export default ${JSON.stringify(resList)}`
          // 生成标题及关键字及路由名称文件
          fs.writeFile(path.join(__dirname, '../src/router/config.js'), str, err => {
            callback && callback('success')
          })
        }).catch(err => {
          console.log(err)
          callback && callback('fail')
        })
    })
  }
}

module.exports = function generator (env) { // accept 'dev' 'build'
  if (env === 'dev') {
    let state = 0 // 0 free 1 busy 2 need update
    fs.watch(path.join(__dirname, '../src/pages'), (event, file) => {
      if (state === 0) {
        state = 1
        handler(file, msg => {
          console.log(msg)
          if (state === 2) {
            handler(file, msg => {
              console.log(msg)
            })
          }
          state--
        })
      } else {
        state = 2
      }
    })
  } else {
    handler(void 0, msg => {
      console.log(msg)
    })
  }
}
