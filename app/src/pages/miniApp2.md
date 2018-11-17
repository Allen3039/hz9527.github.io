## 小程序 setData 代理方案

> 首先需要理解小程序 setData 做了什么。微信官方如是说：小程序的视图层目前使用 WebView 作为渲染载体，而逻辑层是由独立的 JavascriptCore 作为运行环境。在架构上，WebView 和 JavascriptCore 都是独立的模块，并不具备数据直接共享的通道。当前，视图层和逻辑层的数据传输，实际上通过两边提供的 evaluateJavascript 所实现。即用户传输的数据，需要将其转换为字符串形式传递，同时把转换后的数据内容拼接成一份 JS 脚本，再通过执行 JS 脚本的形式传递到两边独立环境。
而 evaluateJavascript 的执行会受很多方面的影响，数据到达视图层并不是实时的。

### init

1. 检测 data 并 JSON parse stringify 一次
2. 初始化生命周期钩子
3. 其他的重写方法（做性能监控），克隆对象 （如 props， 方法，总之是非生命周期钩子和 data）

> 所以别想在 options 写法里动手脚了

### setData

```js
// 去掉不影响主流程代码
setData (newData, completeCb = noop) {
  // 判断 newData 是合法的 （Object）
  // path "arr[0].hello[1].world"
  for (var path in newData) {
    // 根据 keyStr 获取 子 Object 顶点和 顶点 对象。过程中可能有两种情况
    // 假设 keysStr a.b.c;
    // 1. this.data {a: {b: 1}}; obj {c: undefined}, key c; 注意 会为 this.data 一些节点添加 空对象和数组
    // 2. this.data {a: {b: {c: 2}}}; obj {c: 2}, key c; 注意 {c: 2} 是 this.data.a.b 的引用
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
    // 以下 ifelse 就是判断原此节点和现此数据节点数据类型是否一致
    /**
      data: {a: 1, b: ''}
      keys: ['a', 0]
      循环前 oldData {a: 1, b: ''} result {}
      第一次循环结束后 result {a: 1, b: ''}; oldData 1
      第二次循环 result.a = []
      注意，一开始将 this.data 将引用给 oldData 第一轮循环结束 oldData 将引用给 result。所以会给 this.data 添加 空数组、空对象 属性
    */
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
```

#### 思考

如果我们通过重写 Page 方法，在 内部重写 Options 钩子函数，在钩子函数里拿到 this，并将 this.data 变成 Observer 会发生什么？
假设我们代理一层 set
```js
// data {a: 1, b: 2}
this.data.a = 3 // set notify => setData => obj: {a: 1, b: 2} key a => obj.a = 2 不会使得 Observer 关系变乱
// 这里之所以 不会变乱 是因为 3 是一个 基本数据类型，而 get this.data.a 就是这个，所以不会 触发 set，而当 a 的值是一个引用呢？
```

代理多层也是一样的道理，问题在于 `obj[key] = deepClone(newData[keyStr])` 然后就会 不断 set => setData => set ...  

##### 问题

1. 我们想解决什么问题？ 频繁 setData 带来的性能问题，我们希望截流，让开发者不用思考 setData 是否会带来性能问题
2. 为什么代理 set 行为？ 一方面通过这种方式帮助开发者在合适的时机 setData，另一方面不需要显式调用 setData

如果必须用这种 代理 set 方案 呢？

##### 解决方案

1. 拷贝一个 data，我们暴露给开发者另一个对象比如 this.$data，然后将 set this.$data 将其行为复制给 this.data
2. 我们在 set 行为加一个 锁机制

##### 锁机制？

锁机制很好理解，但是到底该如何使用？

1. 忽略 开发者的 set 行为。即开发者 set 只触发 notify，异步队列开始时 开锁，在 setData set 完成 锁上。
2. 忽略 setData set 行为。即开发者 set 触发 notify & set，异步队列开始时 锁上，在 setData 完成 开锁。

哪种更好？

1. 锁住用户 set，会让 get 行为 延迟，而且不能保证数据一致性 （待会看示例）
2. 锁住 setData set，那真是。。。帮你 parse keysStr， deepClone，你给我锁住了。不过 get 行为不会延迟，而且数据能保持一致

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
  // 但是在 setData 完成后，更改 obj 的 key，锁住 用户 set 是不能响应的，因为 set 拿到的是 obj 的深克隆返回
}, 0)

```

> 总体来看 锁住 setData set 行为好像更为合理，但是确实底层做的很多事感觉就白费了

##### 代理 this.data key 的set 行为 最终方案

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

是不是有思路了？ 你不是 for 吗？我让你 for 不到不就行了，反正回头你会做 JSON.stringify 但是 这样会拿到一个空对象，但是思路是类似的

我们代理一个特别简单的属性，然后在其get上添加各种 key，这样就可以保证后续拿到的就是一个我们想要的 data，但是会给这个 data 添加一个不必要的属性，总之就是欺骗 for 循环
```js
const newData = {
  a: {b: 1},
  'b.c': 1
}
let myNewData = {
  data: 2
}
Object.defineProperty(myNewData, 'data', {
  get() {
    for (let key in newData) {
      myNewData[key] = newData[key]
    }
    delete myNewData.data
    // 建议不要删，因为有可能有检测机制导致报错。总之我们的目的只是 骗过 for。
    // 当然 返回 undefined 和删除其实是一样。而且 JSON.stringify 也会忽略 值为 undefined 的 key
    return void 0
  }
})

function setData(data, cb) {
  for (let key in data) { // 这里并不会调用 get，所以只能拿到一个 key
    console.log(key, data[key]) // 如果不访问 data.key 是不会调用 getter
  }
  console.log(data)
  console.log(JSON.stringify(data))
}
setData(myNewData)
```

拷贝方式更简单，一定程度也只是做了映射，但是this.data this.$data 好像有点谜。另外如果 data 很大呢？  

但是两者主流程是一致，开发者使用类似 `this.data.a = xx`，然后在 set 里记录，最后计算一个合理的 newData，执行 setData  

[JSON.stringify](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
[getter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get)

### 设计思路

1. 重写 Page，重写 Options onLoad
2. onLoad 代理 data（注意第一个锁机制，在 onHide set 会进行，但是 不会run，会在onShow run）
3. 更改 data 会将变化的 key value 通知给 upper
4. upper 将结果 push 队列判断是否需要 run 一个异步，异步 then 里计算 newData, 操作 setData
5. 卸载页面可以清空代理（其实无所谓）

> 附：

微信小程序 setData 代码
```js
// setData
function(state, callback) {
  try {
    var type = (0, a.getDataType)(state);
    if ("Object" !== type)
      return void (0, a.error)("类型错误", "setData accepts an Object rather than some " + type);
    for (var key in state) {
      void 0 === state[key] && (0, a.error)("Page setData warning", 'Setting data field "' + o + '" to undefined is invalid.');
      var r = (0, u.getObjectByPath)(this.data, key)
      var data = r.obj
      var s = r.key;
      data && (data[s] = (0, f.default)(state[key]))
    }
    c.default.emit({
      data: state
    }, this.__wxWebviewId__, t)
  } catch (e) {
    (0,
    a.errorReport)(e)
  }
}

f.default
function r(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : o;
  if (null === e)
    return null;
  var n = (0,
  u.copyValue)(e);
  if (null !== n)
    return n;
  var r = (0,
  u.copyCollection)(e, t)
  , a = null !== r ? r : e;
  return i(e, t, a, [e], [a])
}
t.getObjectByPath = function(pageData, key) {
  for (var n = r(key), i = {}, a = void 0, u = pageData, s = 0; s < n.length; s++)
    Number(n[s]) === n[s] && n[s] % 1 == 0 ? Array.isArray(u) || (i[a] = [],
    u = i[a]) : (0,
    o.isPlainObject)(u) || (i[a] = {},
    u = i[a]),
    a = n[s],
    i = u,
    u = u[n[s]];
  return {
      obj: i,
      key: a
  }
}

```
