## 小谈闭包closure

<b class="update-time">{{1551503379253 | formatTime}}</b><b class='type'>js</b>
<b class='kw'>闭包</b> <b class='kw'>垃圾回收</b>

### 什么是闭包？

> 闭包是指有权访问另一个函数作用域的变量的函数。闭包是函数和声明该函数的词法环境的组合。

以上定义大概是看到的比较多的对闭包的定义。当然闭包有狭义的也有广义的，而大部分我们讨论的都是狭义的（外层函数执行完而其局部对象并不被销毁）

#### 闭包的形成原因

我们知道，在 js 中，当函数执行前，作用域会为该函数创建活动对象（当多层函数嵌套执行时就形成了作用域链），当函数执行完就会销毁这个作用域（活动对象），将作用域链 pop。而闭包则是由于内部函数访问了该函数的作用域并通过一些方式使得活动对象不能被释放

```js
function a() {
  let b = 0;
  return () => b++
}
const c = a()

const obj = {}
function d() {
  let b = 0;
  obj.fn = () => b++
}
d()

function e() {
  let b = 0;
  setInterval(() => b++, 500)
}
```

> 以上几种方式都能形成狭义上的闭包

#### 狭义上的闭包的形成条件

1. 函数内部声明了函数
2. 内部函数使用了该函数的局部变量
3. 函数执行完后内部函数不被销毁

### js 引擎的垃圾回收机制

或许说到这里大部分人会想到 引用计数、标记清除。实际上讲清楚 js 引擎垃圾回收就一句话 当内存不再需要使用时释放

> 从2012年起，所有现代浏览器都使用了标记-清除垃圾回收算法。所有对JavaScript垃圾回收算法的改进都是基于标记-清除算法的改进，并没有改进标记-清除算法本身和它对“对象是否不再需要”的简化定义。

[拓展阅读](https://juejin.im/post/5b1f7e62e51d45068a6cb98f)

### 再看闭包

其实在我们日常的代码中，闭包随处可见，简单的模块化实现，惰性单例，高阶函数等等都用到了闭包。个人经常会陷入一个怪圈，在一些多层传递的异步代码中由于使用了闭包，经常担心是否被回收？

举个例子，在封装小程序请求接口时希望将接口封装成 thenable 风格，并支持 abort，还支持最大十个并发，出现了以下代码

```js

const MAX = 10;
let counts = 0;
const queue = [];
const timer = (time) => new Promise((resolve, reject) => setTimeout(() => reject(genRes('timeout')), time))
const request = config => new Promise((resolve, reject) => {
  let task
  if (MAX >= counts++) {
    const item = () => (task = wx.request(genOpt(config, resolve, reject)))
    queue.push()
    task = {
      abort() {
        if (queue.indexOf(item) > -1) {
          queue.splice(queue.indexOf(item), 1)
          reject(genRes('abort'))
        } else {
          task.abort()
        }
      }
    }
  } else {
    task = wx.request(genOpt(config, resolve, reject))
  }
  if (typeof config.requested === 'function') {
    config.requested(task)
  }
})
const finishQueue = () => {
  counts--;
  queue.length > 0 && queue.shift()()
}
const wxFetch = config => {
  const list = [request(config)]
  typeof config.timeout === 'number' && list.push(timer(config.timeout))
  return Promise.race(list).then(res => {
    finishQueue()
    return res
  }, err => {
    finishQueue()
    return Promise.reject(err)
  })
}

// 业务代码
wxFetch({
  requested(task) {
    setTimeout(() => {
      task.abort()
    }, 500)
  }
}).then(res => {
  // ...
}, err => {
  // ...
})
```
