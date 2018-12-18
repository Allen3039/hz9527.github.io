# 前端模块化

<b class='type'>js</b>
<b class='kw'>前端模块化</b> <b class='kw'>es6 module</b> <b class='kw'>commonJs</b> <b class='kw'>AMD</b><b class='kw'>UMD</b><b class='kw'>CMD</b>

> 模块化是工程化的基础，前端模块化的价值体现在 1. 合成复用； 2. 单一职责。对项目可维护性和可读性也大大增强
这里就不说如何使用了 [阮老师文章](http://es6.ruanyifeng.com/#docs/module)

## 有哪些模块？

## commonJS 与 es6 module

1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

如何理解第一句话？刚开始学 js 时应该听说过，函数实参是按值传递的吧？
其实就是这个意思，如果是引用类型，拷贝的就是引用，如果是基本数据类型，拷贝的就是这个值。
ES6 模块输出的是值的引用（其实一样是挂载到一个对象上了，只是commonjs 还会挂到）

### 加载时机

### 循环引用

## AMD&UMD&CMD