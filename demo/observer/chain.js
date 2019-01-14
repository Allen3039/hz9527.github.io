const emptyArray = []
let id = 0
class Chain {
  constructor(key) {
    this.pres = emptyArray
    this.effects = emptyArray
    this.id = ++id
  }
  emit(now, old, path = [], type = 0) { // 0 modify 1 add -1 delete
    if (this.pres.length > 0) {
      this.effects.forEach(fn => fn(now, old))
    }
  }
  appPre() {}
  removePre() {}
  addEffect() {}
}
