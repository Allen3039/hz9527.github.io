## vue 源码解读

menu  
[]()

### 入口文件

1. initGlobalAPI
2. 定义 isServer ssrContext
3. 定义 FunctionalRenderContext
4. 设置版本
5. 导出 Vue

### Vue(instance/index)

1. 定义 Vue 构造函数
2. 内部调用 this.\_init(options)
3. initMixin
4. stateMixin
5. eventMixin
6. lifecycleMixin
7. renderMixin
8. 导出 Vue

### initMixin(instance/init)

1. 导出 initMixin
  1. 定义 Vue.prototype.\_init 方法
2. 导出 initInternalComponent
3. 导出 resolveConstructorOptions


```js
// Watcher

class Watcher {
  // self props
  // vm, expressin, cb, id, deep, user, lazy, sync, dirty, active, deps, newPeds, depIds, newPedIds, before, getter, value
  constructor(vm, expOrFn, cb, opts, isRenderWatcher) {

  }
  get() {
    // 注 当 lazy为 false this.value = this.get()
  }
  addDep() {

  }
  cleanupDeps() {

  }
  update() {

  }
  run() {

  }
  evalute() {

  }
  depend() {

  }
  teardown() {

  }
}
```















hz
