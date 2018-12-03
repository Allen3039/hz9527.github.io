class Watcher {
  // self props
  // vm, expressin, cb, id, deep, user, lazy, sync, dirty, active, deps, newPeds, depIds, newPedIds, before, getter, value
  constructor(vm, expOrFn, cb, opts, isRenderWatcher) {
    // 注 当 lazy为 false this.value = this.get()
    this.getter = typeof expOrFn === 'function' ? expOrFn : parsePath(expOrFn)
    this.value = this.lazy ? void 0 : this.get()
  }
  get() {
    // 1. Dep.target = this: watcher
    // 2. value = this.getter.call(vm, vm)
    // 2.1 call Observer(data or props) get & because of target &
    // dep.depend() => Dep.target.addDep(this: dep)
    // 3 if this.deep traverse(value)
    // 4. 归还 Dep.target
    // 5. this.cleanupDeps() 更新依赖
    // return value
  }
  addDep(dep) {
    // 1. 将 dep & id 添加到 this.newDepIds & this.newDeps
    // 2. 如果 depIds 不存在该 id dep.addSub(this)
  }
  cleanupDeps() {
    // 将 this.deps 全部取出来
    // 如果 dep.id 不存在于 newDepIds，则 dep.removeSub(this)
    // 将 newDepIds 赋值给 depIds；newDeps 赋值给 deps；清空 new
    // 配合 get & addDep，达到的目的是 每次 get() 时，会收集新的依赖，清空旧的依赖
  }
  update() {
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }
  run() {

  }
  evalute() { // computed 专属
    this.value = this.get()
    this.dirty = false
  }
  depend() { // watcher 被观察时，在求值时会判断 Dep.target，这样就可以将 该watcher 的所有依赖添加到另一个 watcher 内
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }
  teardown() {
    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.
      if (!this.vm._isBeingDestroyed) {
        remove(this.vm._watchers, this)
      }
      let i = this.deps.length
      while (i--) {
        this.deps[i].removeSub(this)
      }
      this.active = false
    }
  }
}
