## 实现一个promise

<b class="update-time">{{1542100282249 | formatTime}}</b>
<b class='type'>js</b>
<b class='kw'>promise</b> <b class='kw'>promise实现</b>

> `Promise` 大概是前端开发者非常常用的函数之一，除了使用它，是否考虑过自己实现一个简单的 `Promise` 构造函数？

### promise基础

1. new Promise
2. Promise.resolve Promise.reject
3. Promise.all Promise.race Promise.try

### 思考几个问题

1. Promise函数参数的执行是同步还是异步？
2. Promise.prototype.then/catch返回？
3. 如果返回本身就是一个Promise，那么是否会产生两次异步？
4. resolve后代码报错是否会被catch？
5. Promise未执行的then／catch行为？

用以下demo来简单解答这几个问题

```JavaScript
// Promise函数参数的执行是同步还是异步？
// 这将决定我们如何设计异步
console.log(1)
new Promise(r => {
  console.log(2)
  r()
}).then(r => console.log(3))
console.log(4)
// 1 2 4 3
/** Promise函数参数是同步的 */

// Promise.prototype.then/catch返回？
// 这将决定我们如何设计then／catch返回
new Promise(r => {
  r()
}).then(r => {
  console.log(1)
  Promise.resolve(2).then(r => console.log(r)) // 如果 2 先 log 证明 then 返回一个异步函数
  return 3
}).then(r => {
  Promise.resolve(4).then(r => r).then(r => console.log(r)) // 如果 4 先 log 证明 then fn 返回 promise 不会覆盖原 promise
  console.log(r)
  return Promise.resolve(5)
}).then(r => console.log(r))
console.log(6)
// 6 1 2 3 4 5
/** Promise.prototype.then/catch返回同样是异步函数（新的Promise）*/

// resolve后代码报错是否会被catch？
// 这将决定我们如何设计try catch
new Promise(r => {
  r()
  throw new Error('there has a error')
}).then(r => {
  console.log(1)
}).catch(e => {
  console.log(2, e)
})
// 1
/** resolve后的错误并不会被catch */

// Promise未执行的then／catch行为？
// 这将决定我们如何设计then catch默认处理
new Promise(r => {
  r()
}).then(r => {
  return 1
}).then()
.then(r => {
  console.log(r)
})
// 1
/** 当then／catch未处理会一直传递直到被处理（值穿透问题）*/
```

### Promise构造函数基础实现

> 以示区分，使用 `MyPromise` ，本节仅实现 `new MyPromise` , `then` , `catch`

**大致代码**

```JavaScript
function MyPromise (exector) {
  let resolve // ...
  let reject // ...
  exector(resolve, reject)
}
MyPromise.prototype.then = function (onResolved, onRejected) {
  // ...
}
```

**基本思路**

1. 在实例调用then时状态不一定确认了，因此可能需要在更改状态时执行
2. resolve及reject由构造函数实现，函数本身只用于更改状态机和保存数据和执行可能需要执行的监听函数
3. 状态一旦确认不可变更，因此需要有锁机制，我们定义三种状态，resolved rejected，pending
4. then、catch返回均是一个新的Promise实例，而其监听函数的返回Promise 不会覆盖这个 Promise
5. 在执行resolve前的错误都应该被catch，反之则不应被catch
6. 在then、catch未传递监听函数应该让新的实例获得其状态及数据

**基本代码**

```JavaScript
function MyPromise (exector) {
  this.status = 'pending'
  this.onSettled = () => {}
  exector(
    data => this._setState('resolved', data),
    data => this._setState('rejected', data)
  )
}
MyPromise.prototype._setState = function (state, data) {
  if (this.status === 'pending') {
    this.status = state
    this.data = data
    this.onSettled()
  }
}
MyPromise.prototype.then = function (onResolved, onRejected) {
  return new Promise((resolve, reject) => {
    // ...
  })
}
```

接下来就是then的实现了，注意以下几点：

1. 返回是promise
2. 值的穿透

```JavaScript
MyPromise.resolve = function(result) {
  return new MyPromise((resolve, reject) => {
    if (result && result.constructor === MyPromise) {
      result.then(resolve, reject)
    } else {
      resolve(result)
    }
  })
}
MyPromise.prototype.then = function(onResolved, onRejected) {
  if (this.status === 'pending') {
    return new MyPromise((resolve, reject) => {
      // 将 resolve reject onResolved onRejected 保持起来
    })
  } else if (this.status === 'resolved') {
    return MyPromise.resolve(onResolved(this.data))
  } else {
    return MyPromise.reject(onRejected(this.data))
  }
}
```

promise构造函数基本框架已完成，接下来就是异步、catch错误及catch、finally实现

1. 利用值的穿透、then来实现catch、finally
2. catch哪里？
3. 何时异步？

```JavaScript
// 利用值的穿透实现
MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}
MyPromise.prototype.finally = function (onSettled) {
  return this.then(onSettled, onSettled)
}

// 在resolve后的错误不应该被catch，因此需要catch的地方就是exector及onResolved
```

然后就是构造函数方法的实现Promise.resolve,Promise.reject,Promise.all,Promise.race及一些校验

```JavaScript
```

第一版promise基本完成，但是还有很多和[标准](https://promisesaplus.com/)不一致的地方，代码如下：

```JavaScript
```

那么思考下如何实现一个更为严谨的promise构造函数  

### Promise构造函数进阶实现
test
