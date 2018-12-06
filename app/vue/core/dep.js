class Dep {
  constructor() {
    // this.id this.subs = []
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }
  removeSub() {}
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
  notify() {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update() // update 过程中可能会收集依赖，因此需要 slice
    }
  }
}
Dep.target = null
const targetStack = []

export function pushTarget (_target: ?Watcher) {
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

export function popTarget () {
  Dep.target = targetStack.pop()
}
