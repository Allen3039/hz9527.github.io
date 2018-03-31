import Config from '../router/config.js'

const MenuConf = new Map(['js', 'css', '框架', '工程化', '踩坑', '其他'].map(key => [key, -1]))
const MenuDefault = '其他'

function getMenuList () {
  let result = []
  Config.forEach(item => {
    let type = MenuConf.has(item.type) ? item.type : MenuDefault
    let ind = MenuConf.get(type)
    if (ind === -1) {
      result.push({
        key: type,
        list: [item]
      })
      MenuConf.set(type, result.length - 1)
    } else {
      result[ind].list.push(item)
    }
  })
  return result
}

export {
  getMenuList
}
