// 个人评价： 这里代码其实有些混乱。。。
// 总体思路 observe 一方面是 Observer 工厂函数，另一方面还是 getter observer
// 思考： props 使用 defineReactive data 使用 observe
// 1. props 本身已经是 observer 了，所以只需要一层代理即可 defineReactive
// 2. defineReactive 内部调用 observe 但由于 initProps 时 shouldObserve 为 false，所以不会深度观察
// 2.1 这就是 observe return ob 的原因
// 3. childOb 是一个 Observer 所以 可以收集依赖
// 思考：array 没有 defineIndex
// 所以 this.arr[0] = obj 不会响应，但是 item 发生变化是可以响应的

// 根据 defineReactive !shallow && observe(val) 得知，默认是 深度观察

// 1. Observer
class Obsever {
  constructor (data) {
    // this.value = data this.dep = new Dep() this.vmCount = 0 def(data, '__ob__', this)
    // isArray protoAugment or copyAugment 重写数组原型或数组相关方法
    // this.observeArray(data) or this.walk(data)
  }
  walk (obj) {
    // for defineReactive(obj, keys[i])
  }
  observeArray (arr) {
    // for observe(items[i])
  }
}
// 2. observe
function observe (value, asRoot) {
  if (!isObject(value) || value instanceof VNode) return
  let ob
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if () { // 非服务端渲染 shouldObserve array or object 可拓展对象 !value._isVue
    ob = new Observer(value)
  }
  if (asRootData && ob) ob.vmCount++
  return ob
}
// 3. defineReactive
function defineReactive (obj, key, val, customStter, shallow) {
  const dep = new Dep()
  // 判断 key 可配置
  const getter = property && property.get
  const setter = property && property.set
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }
  let childOb = !shallow && observe(val) // 深度观察，注意：其实是默认深度监听
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          Array.isArray(value) && dependArray(value)
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      if (newVal === value || (newVal !== newVal && value !== value)) return
      // #7981: for accessor properties without setter 例如将 computed 作为 props 传递，不能set
      if (getter && !setter) return
      setter ? setter.call(obj, newVal) : (val = newVal)
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}

function dependArray (arr) {
  for (let e, i = 0, l = arr.length; i < l; i++) {
    e = value[i]
    e && e.__ob__ && e.__ob__.dep.depend()
    if (Array.isArray(e)) dependArray(e)
  }
}
