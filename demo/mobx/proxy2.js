// 思路 被代理对象被挂载在一个对象上，key为symbol，defindProperty该key，get后在下一次事件循环查看其key是否被代理（用于防止添加新key，并深度代理）
function MyProxy(target, handler) {
  const key = Symbol()
  const proxy = {
    [key]: target
  }
  // defineProperty
  this = proxy[key];
}

MyProxy.prototype.proxy = function(target) {

}