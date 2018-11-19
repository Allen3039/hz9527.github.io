## 事件循环的一点疑惑

<b class="update-time">{{1542638521139 | formatTime}}</b><b class="type">其他</b>
<b class='kw'>promise</b> <b class='kw'>事件循环</b> <b class='kw'>宏队列与微队列</b>

> 我们知道 js 是单线程执行的，但是借助宿主，可以获得异步的能力，在浏览器中依赖 webAPI，在 node 中依赖 libuv
但是这还不够。我们还需要区分 宏队列（macrotask）和微队列（microtask）。我们知道是先执行微队列再执行宏队列

### 关于 promise 有话说

先看题

<details>
  <summary>js</summary>

  ```js
  new Promise(resolve => {
    console.log('promise1')
    resolve(1)
  }).then(res => {
    console.log('promise1', ++res)
    performance.now()
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

</details>


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

> 我们知道 promise 在 resolver 和 rejecter 可以返回 promise，并且这个 promise 的返回将传递给后续的 resolver 或 rejecter
而 promise 本身在 then cache 也会返回一个 promise，这也是为什么可以被链式调用，而其状态取决于当前 状态，这也是为什么有值的穿透这个现象了
但是

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

我们尝试加一下 性能测试 performance.now()，图又是什么样子的呢？

```sh
# promise1 2 1716.5999999997439
# promise2 2 1717.3000000038883
# promise1 3 1717.800000013085
# promise2 3 1718.1000000127824
# promise2 4 1718.5000000026776
# promise2 5 1718.9000000071246
# promise1 4 1719.200000006822
# promise2 6 1719.600000011269
# promise1 5 1720.0000000011642
# promise1 6 1720.3000000008615
# 很不幸，经过多次测试我们发现 promise1 4 一直介于 promise2 5、6之间，这个就回到事件循环本质上了，每一个 then 都是在微队列的一个切片上，不会重合，所以上面的图如下：
2  3        4  5  6
|__|_____ __|__|__|

 2  3  4  5  6
 |__|__|__|__|
```

> 看到这里我好像明白了，看来 promise 垫片需要重写了，因为返回 Promise 并不是让其代替默认返回的 Promise 而是照常返回，只是 value 是 Promise 实例
显然事件循环是在 resolve reject 内部实现

<details>
  <summary>js</summary>

  ```js
  Promise.resolve = function(result) {
    return new Promise(resolve => {
      if (result && result.constructor === Promise) {
        result.then(resolve)
      } else {
        resolve(result)
      }
    })
  }

  Promise.prototype.then = function(fn, fn2) {
    // 省略状态判断
    return Promise.resolve(fn(this.data))
  }

  // 可能还是懵的，那我们再来看 返回 Promise.resolve(res)即 result就是 Promise.resolve(res)
  Promise.resolve = function(result) {
    return new Promise(resolve => {
      if (result && result.constructor === Promise) {
        // Promise.resolve(res).then(resolve)
        let pro = Promise.resolve(res) // Promise.resolve 内部调用一次 resolve
        pro.then(fn) // then 内部调用 Promise.resolve, Promise.resolve 调用 resolve 两次了
        // 这里 fn 就是 resolve 一共三次，所以间隔了三次事件循环
      } else {
        resolve(result)
      }
    })
  }
  ```

</details>

现在终于能解释为什么 `return Promise.resolve(res)` 间隔了三次事件循环了

#### 总结

then 方法内部实现看来比我想的简单，却存在坑了，因为原本一次事件循环搞定现在却只能通过三次，启发在于 catch 的使用

```js
new Promise((resolve, reject) => {
  reject(1)
}).then(res => console.log(res, 'promise1Resolved'))
.catch(err => console.log(err, 'promise1Rejected'))

new Promise((resolve, reject) => {
  reject(1)
}).then(res => console.log(res, 'promise2Resolved'), err => console.log(err, 'promise2Rejected'))
```

显然是先 catch2

### 关于 macrotask & microtask

先祭出一张图吧  
<img src="../assets/imgs/eventLoop.jpg" width="500px" />

#### 一次事件循环只执行一个 macrotask

看一个例子

```js
setTimeout(() => {
  Promise.resolve(2)
    .then(console.log)
}, 0)

setTimeout(() => {
  console.log(1)
}, 0)
```

答案是 2 1。或许你这里就算用了 performance 也不能看出端倪，但是我们知道 Promise 是异步就好了

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>test macrotask</title>
</head>
<body>
    <div class="test">123</div>
    <script>
      let test = document.querySelector('.test')
      setTimeout(() => {
        setTimeout(() => {
          test.style.width = '300px'
          Promise.resolve(performance.now())
            .then(console.log)
        }, 0)
        setTimeout(() => {
          test.style.width = '200px' // 需要重排才行，如果一个引发重绘一个引发重排也不会 render
          console.log(performance.now(), 'timer2')
        }, 0)
      }, 300) // 需要 firstRender 完成
    </script>
</body>
</html>
```

好吧，我承认为了把它们分到两次事件循环花了很长时间（更新了 Chrome 就不行了。。。。），因为浏览器实在太聪明了！！！  
首先完整的事件循环并不是 run 一个 macrotask 后立马 render 而是 判断是否需要重现渲染。这个完全就是看浏览器心情了。。。。  
根据上面的例子我们得到的结论就是 **每次事件循环只执行一个 macrotask** ，但是问题来了

1. 如果把前一个 time 改为 1 会先执行哪个？
2. 我们在写动画时用 setTimeout 0 会发生什么？

第一个问题的答案是不确定，完全看心情，笔者使用 chrmoe 基本是间隔 2 毫秒才会先执行第二个，但至少可以确定的是 不一定 根据 time（间隔比较小） 参数来决定 installTimer 顺序  
第二个问题 浏览器真的很聪明，我使用的 chrome 开始一般 合并 3-4 帧，然后 合并 10 多帧，最后基本是 7-8 帧，才渲染一次（不管是是否引发重排）

#### 一次事件循环会执行完所有微队列

这一部分感觉没什么好说的，但是可以说的是必须清空微队列才会进入新的事件循环，也就是意味着在一个微队列里执行新的微队列会在一次事件循环里


<b class="show-blog">true</b>
