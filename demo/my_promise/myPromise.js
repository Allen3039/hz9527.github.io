function MyPromise(exector) {
  this._state = 'pending'
  this._tasks = []
  exector(this._changeStateFactory('fulfilled'), this._changeStateFactory('rejected'))
}
MyPromise.prototype._changeStateFactory = function(state) {
  return (data) => {
    if (this._state === 'pending') {
      this._state = state
      this._data = data
      setTimeout(() => {
        if (this._tasks.length > 0) {
          this._state === 'fulfilled' ? this._tasks[0](data) : this._tasks[1](data)
          this._tasks = null
        }
      }, 0)
    }
  }
}
MyPromise.resolve = function(result) {
  return new MyPromise((resolve, reject) => {
    if (result && result.constructor === MyPromise) {
      result.then(resolve, reject)
    } else {
      resolve(result)
    }
  })
}

MyPromise.reject = function(result) {
  return new MyPromise((resolve, reject) => {
    if (result && result.constructor === MyPromise) {
      result.then(resolve, reject)
    } else {
      reject(reject)
    }
  })
}

MyPromise.prototype.then = function(onResolved, onRejected) {
  typeof onResolved !== 'function' && (onResolved = data => data)
  typeof onRejected !== 'function' && (onRejected = data => data)
  if (this._state === 'pending') {
    return new MyPromise((resolve, reject) => {
      this._tasks = [(data) => resolve(onResolved(data)), (data) => reject(onRejected(data))]
    })
  }
  return this._state === 'fulfilled' ? MyPromise.resolve(onResolved(this._data))
    : MyPromise.reject(onRejected(this._data))
}

MyPromise.prototype.catch = function (onRejected) {
  return this.then(void 0, onRejected)
}
