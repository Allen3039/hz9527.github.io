## 实现一个promise
<b class='update-time'>{{1522856732390 | formatTime}}</b>
<b class='type'>js</b>
<b class='kw'>promise</b> <b class='kw'>promise实现</b>

> `Promise`大概是前端开发者非常常用的函数之一，除了使用它，是否考虑过自己实现一个简单的`Promise`构造函数？

### promise基础
1. new Promise
2. Promise.resolve Promise.reject
3. Promise.all Promise.race Promise.try

### Promise构造函数实现
思考以下几个问题：
1. Promise函数参数是同步还是异步？
2. Promise.prototype.then/catch返回？
3. resolve后代码报错是否会被catch？
4. Promise未执行的then／catch行为？

用以下demo来简单解答这几个问题
```JavaScript
// Promise函数参数是同步还是异步？
console.log(1)
new Promise(r => {
  console.log(2)
  r()
}).then(r => console.log(3))
console.log(4)
// 1 2 4 3
// Promise函数参数是同步的

// Promise.prototype.then/catch返回？
```
