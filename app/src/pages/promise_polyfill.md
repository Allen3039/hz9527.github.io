## 实现一个promise
<b class='update-time'>{{1522909332495 | formatTime}}</b>
<b class='type'>js</b>
<b class='kw'>promise</b> <b class='kw'>promise实现</b>

> `Promise`大概是前端开发者非常常用的函数之一，除了使用它，是否考虑过自己实现一个简单的`Promise`构造函数？

### promise基础
1. new Promise
2. Promise.resolve Promise.reject
3. Promise.all Promise.race Promise.try

### 思考几个问题
1. Promise函数参数的执行是同步还是异步？
2. Promise.prototype.then/catch返回？
3. resolve后代码报错是否会被catch？
4. Promise未执行的then／catch行为？

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
// Promise函数参数是同步的

// Promise.prototype.then/catch返回？
// 这将决定我们如何设计then／catch返回
new Promise(r => {
  r()
}).then(r => {
  console.log(1)
  Promise.resolve(2).then(r => console.log(r))
  return 3
}).then(r => {
  Promise.resolve(4).then(r => console.log(r))
  console.log(r)
  return new Promise(r => {
    r()
  })
}).then(r => console.log(5))
console.log(6)
// 6 1 2 3 4 5
// Promise.prototype.then/catch返回同样是异步函数（新的Promise）

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
// resolve后的错误并不会被catch

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
// 当then／catch未处理会一直传递直到被处理（值穿透问题）
```

### promise构造函数实现
