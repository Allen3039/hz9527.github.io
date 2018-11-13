function MyPromise(exector) {
  let resolve = () => {}
  let reject = () => {}
  exector(resolve, reject)
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
      resolve(reject)
    }
  })
}

MyPromise.prototype.then = function(onResolved, onRejected) {

}