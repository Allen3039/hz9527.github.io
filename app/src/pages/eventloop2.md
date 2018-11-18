## 事件循环

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

### 聪明的 timer 调度
