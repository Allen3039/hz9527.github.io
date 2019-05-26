const Status = Symbol('[[PromiseStatus]]');
const Value = Symbol('[[PromiseValue]]');
const noop = () => {}
function nextTick(fn) {
  setTimeout(fn, 0);
}
class Item {
  constructor(promise, onFulfilled, onReject) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onReject = typeof onReject === 'function' ? onReject : null;
    this.promise = promise;
  }
}

function handler(promise, item) {
  nextTick(function() {
    const status = promise[Status];
    const data = promise[Value];
    const cb = status === 'fulfilled' ? item.onFulfilled : item.onReject;
    if (cb === null) {
      (status === 'fulfilled' ? resolve : reject)(item.promise, data);
      return;
    }
    let nextData
    try {
      nextData = cb(data);
    } catch(e) {
      reject(item.promise, e);
      return;
    }
    resolve(item.promise, nextData);
  })
}

function resolve(promise, data) {
  try {
    if (promise === data) {
      throw new Error("can't same");
    } else if (data instanceof promise.constructor) {
      data.then(data => resolve(promise, data), err => reject(promise, err))
      return;
    }
    promise[Status] = 'fulfilled';
    promise[Value] = data;
    finale(promise);
  } catch(e) {
    reject(promise, e);
  }
}

function reject(promise, err) {
  promise[Status] = 'rejected';
  promise[Value] = err;
  finale(promise);
}

function finale(promise) {
  if (promise[Status] === 'pending') return;
  const queue = PromiseQueue.get(promise);
  if (promise[Status] === 'rejected' && queue.length === 0) {
    nextTick(/** dosomething */)
  }
  for (let i = 0; i < queue.length; i++) {
    handler(promise, queue[i]);
  }
  queue.length = 0;
}

const PromiseQueue = new WeakMap();
function argFactory(promise) {
  let hasExec = false;
  const fulfillFn = data => {
    if (hasExec) return;
    hasExec = true;
    resolve(promise, data);
  }
  const rejectFn = err => {
    if (hasExec) return;
    hasExec = true;
    reject(promise, err);
  }
  return [fulfillFn, rejectFn]
}
class MyPromise {
  constructor(executor) {
    PromiseQueue.set(this, []);
    this[Status] = 'pending';
    this[Value] = undefined;
    const [resolve, reject] = argFactory(this);
    try {
      executor(resolve, reject);
    } catch(e) {
      reject(e);
    }
  }

  then(onResolve, onReject) {
    const result = new MyPromise(noop);
    const item = new Item(result, onResolve, onReject);
    if (this[Status] !== 'pending') {
      handler(this, item);
    } else {
      const queue = PromiseQueue.get(this);
      queue.push(item);
    }
    return result
  }

  catch(onReject) {
    return this.then(undefined, onReject)
  }

  finily(onFulfilled) {
    return this.then(onFulfilled, onFulfilled)
  }

  static resolve(data) {
    if (data instanceof MyPromise) {
      return data;
    }
    return new MyPromise(resolve => resolve(data))
  }

  static reject(err) {
    return new MyPromise((_, reject) => {
      reject(err);
    })
  }

  static all(arr) {}

  static race(arr) {}
}
// new MyPromise(r => {
//   r(1)
//   MyPromise.resolve(2).then(console.log)
// }).then(console.log)
new MyPromise(resolve => {
  console.log('promise1')
  resolve(1)
}).then(res => {
  console.log('promise1', ++res)
  performance.now()
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

// MyPromise.resolve(1).then(console.log)
// new MyPromise(r => r(2)).then(console.log)
// console.log(0)
