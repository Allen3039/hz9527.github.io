## 事件循环的一点疑惑

<b class="update-time">{{1542038708508 | formatTime}}</b><b class="type">其他</b>
<b class='kw'>promise</b> <b class='kw'>事件循环</b> <b class='kw'>宏队列与微队列</b>

> 我们知道 js 是单线程执行的，但是借助宿主，可以获得异步的能力，在浏览器中依赖 webAPI，在 node 中依赖 libuv
但是这还不够。我们还需要区分 宏队列（macrotask）和微队列（microtask）。我们知道是先执行微队列再执行宏队列

### 关于 promise 有话说

先看题

```js
new Promise(resolve => {
  console.log('promise1')
  resolve(1)
}).then(res => {
  console.log('promise1', ++res)
  return res
}).then(res => {
  console.log('promise1', ++res)
  return Promise.resolve(res) // 注意这里不一样
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

new Promise(resolve => {
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
```

咋一看，你的答案可能是这样：

```js
// 一开始以为的：    实际是这样：
// promise1        嗯，你是对的
// normal          嗯，你是对的
// promise2        嗯，你是对的
// promise1 2      嗯，你是对的
// promise2 2      嗯，你是对的
// promise1 3      嗯，你是对的
// promise2 3      嗯，你是对的
// promise2 4      嗯，你是对的
// promise1 4      promise2 5
// promise2 5      promise1 4
// promise1 5      promise2 6
// promise2 6      promise1 5
// promise1 6      嗯，你是对的
```

#### 分析

如果知道事件循环，前面到 `Promise.resolve(res)` 没什么可说的。关键是后面发生了什么？为什么慢两个拍？

> 我们知道 promise 在 resolver 和 rejecter 可以返回 promise，并且这个 promise 的 返回将传递给后续的 resolver 或 rejecter
而 promise 本身在 then cache 也会返回一个 promise，这也是为什么可以被链式调用，而其状态取决于当前 状态，这也是为什么有值的穿透这个现象了

我们现在用两格短线表示 then 的时间，上面是 promise1 下面是 promise2  
```sh
2  3     4  5  6
|__|__ __|__|__|

2  3  4  5  6
|__|__|__|__|
```

现在大概知道不是 `promise2 4 => promise1 4 => promise2 5 => promise1 5 => promise2 6 => promise1 6` 了  
但是为什么是 `promise2 4 => promise2 5 => promise1 4 => promise2 6 => promise2 5 => promise1 6` ?  
问题在于 `promise2 5` 在 `promise1 4` 之前执行？

```js
// 我们假设 Promise.prototype.then 内部实现

Promise.prototype.then = function(fn1, fn2) {
  // 省略状态判断
  let result = fn1(res)
  if (result.construtor === Promise) {
    return result
  }
  return Promise.resolve(res)
}
```
