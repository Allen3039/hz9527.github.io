## async&await正确的打开方式

<b class="update-time">{{1560771004219 | formatTime}}</b><b class='type'>js</b>
<b class='kw'>async</b> <b class='kw'>await</b> <b class='kw'>async&await使用</b>

> 由于过去一直沉浸在Promise的世界里，对async和await使用较少，在此也谈谈自己的见解吧

### 快速开箱

x[test](./call.md)

### 注意事项

通过快速开箱，想必已经对async有了基础的了解。那么开始简单对比下Promise会发现几个问题：  
1. 我们发现await基本将异步方式变成了“同步”，那么如何并行异步？
2. 如何才能优雅地catch错误

先看看Promise解决回调地狱，并行，catch吧
```js
// 通过then的形式将不断嵌套的回调变得平行
promiseFn()
  .then(...)
  .then(...)

// 通过Promise.all解决并行异步问题
Promise.all(...)

// 通过catch捕获整个Promise链上的任意错误
promiseFn()
  .then(...)
  .then(...)
  ...
  .catch(...)
```

其实在我看来Promise已经