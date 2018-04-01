function replaceKw (str, kw, reg) {
  return str.replace(reg, `<span class='match-kw'>${kw}</span>`)
}

export default function search (kw, source) {
  if (kw) {
    let resultMap = new Map() // key is config index, value is item
    // 分词并去重
    Array.from(new Set(kw.split(' ').filter(item => item)))
      .forEach(key => { // source [{title, time, type tips}]
        // 1.多字段匹配（用于加深文字）2.防止多次匹配 3.暂不考虑重叠文字 如'js jsx'
        source.forEach((item, ind) => {
          let hasAdd = resultMap.has(ind)
          let info = hasAdd ? resultMap.get(ind) : {addState: 0} // 匹配加权
          let reg = new RegExp(key, 'g')
          let matchTitle = item.title.match(reg)
          if (matchTitle) {
            info.title = replaceKw(hasAdd ? info.title : item.title, key, reg)
            info.addState += matchTitle.length
          }
          let matchType = item.type.match(reg)
          if (matchType) {
            info.type = replaceKw(hasAdd ? info.type : item.type, key, reg)
            info.addState += matchType.length
          }
          info.tips = item.tips.slice()
          item.tips.forEach((tip, i) => {
            let matchTip = tip.match(reg)
            if (matchTip) {
              info.tips[i] = replaceKw(hasAdd ? info.tips[i] : tip, key, reg)
              info.addState += matchTip.length
            }
          })
          if (info.addState > 0) {
            if (!hasAdd) {
              !('title' in info) && (info.title = item.title)
              !('type' in info) && (info.type = item.type)
              info.path = '/' + item.time
            }
            resultMap.set(ind, info)
          }
        })
      })
    let result = []
    resultMap.forEach(item => {
      result.push(item)
    })
    return result.sort((pre, next) => next.addState - pre.addState)
  } else {
    return []
  }
}
