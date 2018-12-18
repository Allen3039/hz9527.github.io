title: 浅尝小程序 setData
speaker: hz9527
transition: slide3
files: /share.js,/share.css,/zoom.js
theme: moon
usemathjax: yes

[slide]

# 浅尝小程序 setData

## this.setData 小程序最重要最核心的 API，没有之一

[slide]

## 背景知识 -- 事件循环

----
之所以称为事件循环，是因为它经常被用于类似如下的方式来实现：

{:&.rollIn}

```js
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
```

<br/>
> Job 是 ES6 中新增的概念，它与 Promise 的执行有关，可以理解为等待执行的任务；Job Queue 就是这种类型的任务的队列。JavaScript Runtime 对于 Job Queue 与 Event Loop Queue 的处理有所不同。
每个 JavaScript Runtime 可以有多个 Job Queue，但只有一个 Event Loop Queue
当 JavaScript Engine 处理完当前 chunk 后，优先执行所有的 Job Queue，然后再处理 Event Loop Queue

<br/><p style="text-align: left">总之需要记住的是同一个 chunk 微队列先执行</p>

[slide]

<img src="/assets/eventLoop.jpg" width="80%">
[slide data-transition="vertical3d"]
<img src="/assets/eventLoop2.png" width="60%">

[slide]

## 讲这些干嘛？

----
{:&.fadeIn}

```js
// 去掉不影响主流程代码
setData (newData, completeCb = noop) {
  for (var path in newData) {
    var {obj, key} = getObjectByPath(this.data, path); // 获取一个结果
    obj && (obj[key] = deepClone(newData[path]));
  }
  wx.emit({data: newData}, this.__wxWebviewId__, t) // 注意这里
}
```

[slide]

## 再看事件循环

<img src="/assets/default.svg" width="70%">
[slide data-transition="vertical3d"]
<img src="/assets/eventLoop3.png" width="80%">

[slide]

----
<iframe data-src="/assets/demo.html" style="height: 600px"></iframe>

{:&.fadeIn}

+\_+ 忘了这里准备讲啥了。。。反正就是前面提到的 1次事件循环不一定会渲染，微队列很快！

[slide]

## 回到 setData

----

<pre>
  <code style="max-height: 500px">
  setData (newData, completeCb = noop) {
    // path "arr[0].hello[1].world"
    for (var path in newData) {
      // 根据 keyStr 获取 子 Object 顶点和 顶点 对象。过程中可能有两种情况
      var {obj, key} = getObjectByPath(this.data, path); // 获取一个结果
      // 修改 obj 中 某个 key 的值。注意 obj 是 this.data 某个 子对象的引用，所以也会修改 this.data
      obj && (obj[key] = deepClone(newData[path]));
    }
    // 派发 dataChange 事件 给 native 等等，上面弄了半天好像根本对这里就没影响啊！！！！
    wx.emit({data: newData}, this.__wxWebviewId__, t)
  }

  function getObjectByPath (data, keyStr) {
    var keys = parsePath(keyStr)
    var result = {}
    var key = void 0;
    var oldData = data;
    for (var ind = 0; ind < keys.length; ind++) {
      let curKey = keys[ind]
      if (Number(curKey) === curKey && curKey % 1 == 0) {
        if (!Array.isArray(oldData)) { // 原父节点数据不是数组
          result[preKey] = [];
          oldData = result[preKey]
        }
      } else {
        if (getDataType(oldData) !== 'Object') { // 原父节点数据不是对象
          result[preKey] = {}
          oldData = result[preKey]
        }
      }
      preKey = curKey;
      result = oldData;
      oldData = oldData[curKey];
    }
    // obj 根据 keys 获得的叶子对象或数组，key 则是这个叶子对象顶点，如：
    // this.data {a: {b: 1}} keyStr a.b =>  obj {b: 1} key b
    // 复杂一点 this.data {a: {b: 1, c: 2}} keyStr a.b => obj {b: 1, c: 2} key b
    return {
      obj: result, // obj是包含 key 的最小一层对象，可以是数组
      key: preKey, // key是原始 key 的最小一层值，可以是数字（下标）
    };
  }
  </code>
</pre>

[slide]

----

## setData 干了啥？

转了一大圈原来 setData 就干了两件事

1. 根据增量对象修改 this.data (深拷贝) {:&.fadeIn}
2. 把增量对象通过 native 偷偷告诉 webview

[slide]

## 我们可以怎么搞事情呢？ 😂

----
{:&.fadeIn}
<p style="text-align: left">思考几个问题：</p>

1. 我们是怎么写小程序的？
2. 我们能弄到 page/component 实例的构造函数嘛？

```js
Page({
  data: {}
  // ...
})
```

[slide]

## 好像明白了一点

----
{:&.fadeIn}

Options！  

覆盖 Page Component，通过这些方法重写 Options 不就行了？

> 注意 小程序 初始化基本是毫无人性地将 data 作了 JSON.parse(JSON.stringify(opt.data))，所有你传进来的 对象 深拷贝了一份

<br/><p style="text-align: left">所以当然是选择原谅他啦！</p>

[slide]

```js
const oldPage = Page

Page = function(opt) {
  const manager = new Manager()
  Manager.created.forEach(fn => fn(opt, manager))
  const {onLoad, onShow, onHide, onUpload} = opt;
  opt.onLoad = function() {
    manager.install(this) // page instance
    onLoad && onLoad.aplly(this, arguments)
  }
  opt.onShow = function() {
    manager.play(this)
    onShow && onShow.aplly(this, arguments)
  }
  opt.onHide = function() {
    manager.stop(this)
    onHide && onHide.aplly(this, arguments)
  }
  opt.onUpload = function() {
    let id = manager._id
    manager = null // 释放一下 manager，毕竟不太清楚小程序有没有释放 opts
    Manager.destoryed.forEach(fn => fn(id)) // 用于销毁
    onUpload && onUpload.aplly(this, arguments)
  }
  oldPage(opt)
}
```

[slide]

## 事情当然不会那么简单

> 我们通过重写 Page 方法，在 内部重写 Options 钩子函数，在钩子函数里拿到 this，并将 this.data 变成 Observer，然后彻底忘掉 setData

<br/><br/>

----
{:&.fadeIn}

```js
// data {a: 1, b: 2}
this.data.a = 3
// set notify => setData => obj: {a: 1, b: 2} key a => obj.a = 2
// 不会使得 Observer 关系变乱
```

> 这里之所以 不会变乱 是因为 3 是一个 基本数据类型，而 get this.data.a 就是这个，所以不会 触发 set，而当 a 的值是一个引用呢？

[slide]

## 让我再想想

----

1. 我们想解决什么问题？ 频繁 setData 带来的性能问题，我们希望截流，让开发者不用思考 setData 是否会带来性能问题 {:&.fadeIn}
2. 为什么代理 set 行为？ 一方面通过这种方式帮助开发者在合适的时机 setData，另一方面不需要显式调用 setData

<br/><br/>

{:&.fadeIn}

<div style="text-align: left">
<span class="label-primary">如果必须用这种 代理 set 方案 呢？</span>
</div><br/>

1. 拷贝一个 data，我们暴露给开发者另一个对象比如 this.$data，然后将 set this.$data 将其行为复制给 this.data
2. 我们在 set 行为加一个 锁机制

[slide]

## 锁机制很好理解，但是到底该如何使用？

----

1. 忽略 开发者的 set 行为。即开发者 set 只触发 notify，异步队列开始时 开锁，在 setData set 完成 锁上。
2. 忽略 setData set 行为。即开发者 set 触发 notify & set，异步队列开始时 锁上，在 setData 完成 开锁。

<br/><br/>

{:&.fadeIn}

<div style="text-align: left">
<span class="label-primary">哪种更好？</span>
</div><br/>

1. 锁住用户 set，会让 get 行为 延迟，而且不能保证数据一致性 （待会看示例）
2. 锁住 setData set，那真是。。。帮你 parse keysStr， deepClone，你给我锁住了。不过 get 行为不会延迟，而且数据能保持一致

[slide]

```js
// 假设只做了一层代理
const obj = {}

this.data.a = obj // this.data {a: null}

console.log(this.data.a)
// 锁住用户 set：null
// 锁住 setData set: {}

obj.b = 1

setTimeout(() => {
  console.log(this.data.a.b)
  // 两种都是 1，因为我们传递的是引用
  // 但是在 setData 完成后，更改 obj 的 key
  // 锁住 用户 set 是不能响应的，因为 set 拿到的是 obj 的深克隆返回
}, 0)

```

----
{:&.fadeIn}

> 总体来看 锁住 setData set 行为好像更为合理，但是确实底层做的很多事感觉就白费了

[slide data-transition="vertical3d"]

我们再来看这段代码

```js
setData (newData, completeCb = noop) {
  for (var path in newData) {
    var {obj, key} = getObjectByPath(this.data, path); // 获取一个结果
    obj && (obj[key] = deepClone(newData[path]));
  }
  wx.emit({data: newData}, this.__wxWebviewId__, t)
}
```

----
{:&.fadeIn}

是不是有思路了？ 你不是 for 吗？我让你 for 不到不就行了，不过回头你会做 JSON.stringify （会忽略不可遍历的属性和值为 undefined 的属性）

[slide]

## 这就想难倒我大 JS 黑科技吗？

----
{:&.fadeIn}

我们代理一个特别简单的属性，然后在其 调用 getter 时添加各种 key，这样就可以保证后续拿到的就是一个我们想要的 data，但是会给这个 data 添加一个不必要的属性，不过能达到欺骗 for 的目的
<br/><br/><br/><br/>

[slide data-transition="vertical3d"]

```js
const newData = {
  a: {b: 1},
  'b.c': 1
}
let myNewData = {data: 0}
Object.defineProperty(myNewData, 'data', {
  get() {
    for (let key in newData) {
      myNewData[key] = newData[key]
    }
    delete myNewData.data // 删掉你，回头就不会传给 webview 了
    // 当然 返回 undefined 小程序会报错，因为不允许 data 有 值为 undefined 的属性或下标
    return 0
  }
})

function setData(data, cb) {
  for (let key in data) { // 这里并不会调用 get，所以只能拿到一个 key
    console.log(key, data[key]) // 如果不访问 data[key] 是不会调用 getter
  }
  // send
}
setData(myNewData)
```

[slide]
拷贝方式更简单，一定程度也只是做了映射，但是this.data this.$data 好像有点谜。另外如果 data 很大呢？  

但是两者主流程是一致，开发者使用类似 `this.data.a = xx` 的风格 code 就好，然后在 set 里记录，最后计算一个合理的 newData，执行 setData

[slide]

## 设计思路

1. 重写 Page，重写 Options onLoad
2. onLoad 代理 data（注意第一个锁机制，在 onHide set 会进行，但是 不会run，会在onShow run）
3. 更改 data 会将变化的 key value 通知给 upper
4. upper 将结果 push 队列判断是否需要 run 一个异步，异步 then 里计算 newData, 操作 setData
5. 卸载页面可以清空代理（其实无所谓）

> 注意点： 1. 全局可以共用同一个微队列，当然各个实例维护自己的微队列也行；2. 计算 newData 尽量小，而且计算效率要高

[slide]

Q&A

[slide]

Thanks
