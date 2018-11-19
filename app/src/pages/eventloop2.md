## 事件循环

<b class="update-time">{{1542638016258 | formatTime}}</b><b class="type">其他</b>
<b class='kw'>promise</b> <b class='kw'>事件循环</b> <b class='kw'>宏队列与微队列</b>

### 再看事件循环
首先上图  
<img src="../assets/imgs/eventLoop2.png" width="500px" />

```js

setTimeout(() => {
  console.log(1)
})
Promise.resolve(2)
  .then(console.log)
```

> Job 是 ES6 中新增的概念，它与 Promise 的执行有关，可以理解为等待执行的任务；Job Queue 就是这种类型的任务的队列。JavaScript Runtime 对于 Job Queue 与 Event Loop Queue 的处理有所不同。
每个 JavaScript Runtime 可以有多个 Job Queue，但只有一个 Event Loop Queue
当 JavaScript Engine 处理完当前 chunk 后，优先执行所有的 Job Queue，然后再处理 Event Loop Queue

总之需要记住的是同一个 chunk 微队列先执行

### 无阻塞

> 我们经常说 js 是无阻塞 异步 IO

看代码

```js
setTimeout(() => {
  console.log(1)
})

throw new Error()
console.log(2)
```

答案是会 log 1。相信你对 无阻塞 有了认识了。意味着我们在主流程里 阻塞 了，会影响后续代码的运行，但不影响 事件循环

[node timer](https://zhuanlan.zhihu.com/p/30763470)
