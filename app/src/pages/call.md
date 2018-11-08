## call、apply、bind简单实现

<b class="update-time">{{1541691883074 | formatTime}}</b><b class='type'>js</b>
<b class='kw'>call实现</b> <b class='kw'>apply实现</b> <b class='kw'>bind实现</b>

### bind实现

首先看 `bind` 实现，基于 `call` 或 `apply` 实现这个也是最简单的

```js
fn.bind(obj, args)
```

即 `function` 原型上具备 `bind` 方法，并将第一个参数作为执行者，后续参数作为实参传入，注意将函数的返回返回

```js
Function.prototype.myBind = function (obj) {
  let arg = arguments;
  return () => this.apply(obj || null, Array.prototype.slice.call(arg, 1));
}
// test
function test() {
  console.log(arguments);
  return 'test';
}

test.bind(null, 1, 2, 3)();
test.myBind(null, 1, 2, 3)();
```

### call实现

> 从底层上来讲，其实 `call` 相对于 `apply` 简单（性能更好）。那么我们也尝试用 es5 实现

```js
fn.call(obj, arg1, arg2 ...)
```

同样是作为原型方法，需要将参数回传

```js
Function.prototype.myCall = function () {
  var obj = arguments[0] || window;
  var args = [];
  var i = 1;
  while (i < arguments.length) {
    args.push('arguments[' + i++ + ']');
  }
  obj.fn = this;
  // obj.fn(...Array.prototype.call.slice(arguments, 1))
  // 这里不能使用 new Function 因为 functionBody 并不会创建上下文闭包
  var result = eval('obj.fn(' + args + ')');
  delete obj.fn;
  return result;
}
// test
function test() {
  console.log(arguments);
  return 'test';
}

test.call(null, 1, 2, 3);
test.myCall(null, 1, 2, 3);
```

> 这里还是不严格，一方面是缺乏对调用 call 方法的缺少判断，其次是没有处理 null这种情况。在严格模式下，如果第一个参数为 null， this 指向 null。

关于报错的细节我们先不去研究，可以尝试 this 指向 null 和 undefined
```js
Function.prototype.myCall = function () {
  var obj = arguments[0] || window;
  var args = [];
  var i = 1;
  while (i < arguments.length) {
    args.push('arguments[' + i++ + ']');
  }
  obj.fn = this;
  if (arguments[0] === null) {
    obj.fn
  }
  var result = eval('obj.fn(' + args + ')');
  delete obj.fn;
  return result;
}
// test
function test() {
  console.log(arguments);
  return 'test';
}

test.call(null, 1, 2, 3);
test.myCall(null, 1, 2, 3);
```

### 拓展

由于数组的 concat 方法会返回新数组，但是我们经常希望直接更改原数组，所以只能再次赋值

```js
arr = arr.concat(oArr);
arr.push.apply(arr, oArr);
```

模拟 new 实现。我们知道 new 操作是分四步，创建一个对象，创建[[prototype]]链接，this 指向这个对象，没有返回则返回这个对象

```js
Function.prototype.construct = function (aArgs) {
  var oNew = Object.create(this.prototype);
  this.apply(oNew, aArgs);
  return oNew;
};
```

### 拓展阅读

[call和apply的性能对比](https://github.com/noneven/__/issues/6)  
[使用Function构造器生成的函数，并不会在创建它们的上下文中创建闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)  
[JavaScript深入之call和apply的模拟实现](https://github.com/mqyqingfeng/Blog/issues/11)

<b class="show-blog">true</b>
