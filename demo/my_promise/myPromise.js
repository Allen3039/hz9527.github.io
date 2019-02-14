function MyPromise(executor) {
  this.status = 0;
  this.data = null;
  this.onResolved = null;
  this.onRejected = null;
  const handler = (status) => data => {
    if (this.status === 0) {
      this.status = status;
      this.data = data;
      const fn = this.status === 1 ? this.onResolved : this.onRejected;
      typeof fn === 'function' && fn(this.data)
    }
  }
  executor(handler(1), handler(2))
}
MyPromise.resolve = function(data) {
  return new MyPromise((resolve, reject) => {
    if (data && data.constructor === MyPromise) {
      data.then(resolve, reject)
    } else {
      resolve(data)
    }
  })
}
MyPromise.reject = function(err) {
  return new MyPromise((resolve, reject) => {
    if (err && err.constructor === MyPromise) {
      err.then(resolve, reject)
    } else {
      reject(err)
    }
  })
}

MyPromise.prototype.then = function(onResolved, onRejected) {
  return new MyPromise((resolve, reject) => {
    const handler = (fn, data, onFinally) => {
      setTimeout(() => {
        const result = typeof fn === 'function' ? fn(data) : data;
        if (result && result.constructor === MyPromise) {
          result.then(resolve, reject)
        } else {
          onFinally(result)
        }
      })
    }
    if (this.status === 0) {
      this.onResolved = (data) => {
        handler(onResolved, data, resolve)
      };
      this.onRejected = (data) => {
        handler(onRejected, data, reject)
      };
    } else {
      this.status === 1 ? handler(onResolved, this.data, resolve) : handler(onRejected, this.data, reject)
    }
  })
}

MyPromise.prototype.catch = function(onRejected) {
  return this.then(void 0, onRejected)
}

MyPromise.prototype.finally = function(onFinally) {
  return this.then(onFinally, onFinally)
}

new MyPromise(resolve => {
  console.log('promise1')
  resolve(1)
}).then(res => {
  console.log('promise1', ++res)
  return res
}).then(res => {
  console.log('promise1', ++res)
  return MyPromise.resolve(res) // 注意这里不一样
}).then(res => {
  console.log('promise1', ++res)
  return res
}).then(res => {
  console.log('promise1', ++res)
  return res
}).then(res => {
  console.log('promise1', ++res)
  return res
})

console.log('normal')

new MyPromise(resolve => {
  console.log('promise2')
  resolve(1)
}).then(res => {
  console.log('promise2', ++res)
  return res
}).then(res => {
  console.log('promise2', ++res)
  return res
}).then(res => {
  console.log('promise2', ++res)
  return res
}).then(res => {
  console.log('promise2', ++res)
  return res
}).then(res => {
  console.log('promise2', ++res)
  return res
})
