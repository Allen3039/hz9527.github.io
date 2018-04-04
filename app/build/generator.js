const fs = require('fs')
const path = require('path')
const process = require('process')

function getTags (className, str) {
  let tags = str.match(new RegExp(`<b\\s+class\\s?=\\s?\['"\]\\s?${className}\\s?\['"\]\\s?>.+?<\\/b>`, 'g'))
  return (tags || ['']).map(item => item.replace(new RegExp(`<b\\s+class\\s?=\s?\['"\]\\s?${className}\\s?\['"\]\\s?>`), '')
    .replace('</b>', ''))
}

function handler (changeFile, callback) {
  if ((changeFile && /.\md$/.test(changeFile)) || changeFile === void 0) {
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
            let type = getTags('type', str)[0]
            let tips = getTags('kw', str)
            let time = getTags('update-time', str)[0] // {{time | formatTime}}
            time = time.replace('{{', '').replace(/\|\s*formatTime\s*}}/, '').trim()
            console.log(time)
            time = Number(time || 0)
            // 当是修改文件时，并已定义了type时更新文件更新时间，否则直接给一个时间戳
            if (changeFile === file && type) {
              let now = Date.now()
              if (!time || now - time > 1000 * 10) {
                let updateStr
                if (time) {
                  updateStr = str.replace(
                    /<b\s+class\s?=\s?['"]\s?update-time\s?['"]\s?>.+?<\/b>/,
                    `<b class='update-time'>{{${now} | formatTime}}</b>`
                  )
                } else {
                  updateStr = str.replace(
                    /<b\s+class\s?=\s?['"]\s?type\s?['"]\s?>/,
                    `<b class='update-time'>{{${now} | formatTime}}</b>\n<b class='type'>`
                  )
                }
                time = now
                fs.writeFileSync(p, updateStr)
              }
            }
            !time && (time = Date.now())
            resolve({title, type, tips, time, file})
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
