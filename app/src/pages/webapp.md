## 设计一个mvvm框架

> 我们知道 vue 是通过 Watcher 类实现数据更改的监听，从而实现双向数据绑定，React 则是 通过 setData 来触发 render，但是刚刚看了一篇博客，醍醐灌顶
[Dan reply Michel](https://segmentfault.com/a/1190000013040438) [git issue](https://github.com/facebook/react/issues/11527#issuecomment-360199710)
Dan 说会考虑调用者来决定是否同步 （setData 源码注释  There is no guarantee that `this.state` will be immediately updated, so accessing `this.state` after calling this method may return the old value.）。这里实在是太精妙了

那么灵感是什么呢？  

1. 由于组件化，我们在写组件是基本都是通过类或者 Options实现
2. 提供生命周期给开发者使用

所以有一个现象就是，我们基本只能定义一套模版，通过响应事件来完成视图的更新，这么一说感觉还挺像 CycleJs 了  
这也意味着我们更新视图只能通过方法了，那么我们是不是可以覆盖这个方法呢？假设我们实现了一套类似 Vue 的框架

```js
new App(Options)

function App(opt) {
  this.stack = 0
  for (let key in opt) {
    if (typeof opt[key] === 'function') {
      this[key] = function() {
        this.stack++
        opt[key].apply(this, arguments)
        this.stack--
        this.stack === 0 && this.render()
      }
    } else {
      this[key] = opt[key]
    }
  }
}

App.prototype.render = function() {
  if (this.isNeedRender()) return
  // render
}
```
