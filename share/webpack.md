title: 前端工程化
speaker: hz9527
transition: slide3
files: /base/share.js,/base/share.css,/base/zoom.js
theme: moon
usemathjax: yes

[slide]

# 前端工程化

----
一个被人讲烂了的主题

{:&.rollIn}

1. why
2. what
3. how

[slide]

# 发展

----
<h2 class="left">碎片化</h2>

> script 标签插入。通过基本的封装完成碎片化功能

<h2 class="left">雅虎军规时代</h2>

> YUI 等基本工具诞生及优化的基本思路

<h2 class="left">nodejs 诞生</h2>

### grunt bower 时代

### gulp 时代

### webpack rollup时代

{:&.rollIn}

[slide]

# 模块化

> 小三上位后就得拿出正宫的派头了（玩具语言、脚本到标准的后端语言的行头）

IIFE -》 commonjs 模块规范 -》浏览器模块实现 -》 ecmascript 模块化规范

## IIFE Commonjs AMD CMD UMD ESM

[slide]

# 各自定位

## YUI 单一工具型

## Grunt Gulp 资源打包型

## Bower 包管理型

## Yeoman 脚手架型

## webpack rollup 模块打包型

[slide]

# 工程化的好处与坏处

好处

1. 更好地组织代码，便于维护，易拓展
2. 更方便地站在巨人的肩旁上
3. 为持续继承、工业化生产提供更多的接入能力
4. 写更少的代码，做更多的事（跨平台、polyfill、预编译等等）

坏处

1. 门槛变高了
2. 新建成本变高

> 想到 vue-cli 了

[slide]

# webpack 能做什么？

> webpack 本质是模块打包器。很多时候我们执行build，有的同学会说是打包，有的同学会说是编译。但从宏观上来说不是编译，从微观上来说也算编译

webpack 主要就是做三件事

1. 依赖收集及管理（给我一个入口，我能找到你所有用到的模块）
2. all in js（[所有资源都变成模块](https://webpack.js.org/)）
3. 建立打包生命周期

能做什么？

你能想到的，它都能做

[slide]

# 用 webpack 做些什么？

1. 模块化组织代码（天然支持esm 被浏览器支持前，esm实现取决于打包器）
2. 优雅兼容（babel preset & runtime）
3. css 预编译与补全，抽离等等
4. 分包与按需加载（注意和按需引用区别）
5. 其他静态资源转换（svg2font url2base64等等）
...

[slide]

# webpack 核心概念

## entry
## output
## mode
## modules -》 loader
## plugin

