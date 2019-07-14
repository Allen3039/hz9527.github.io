title: about css
speaker: hz9527
transition: slide3
files: /base/share.js,/base/share.css,/base/zoom.js
theme: moon
usemathjax: yes

[slide]

# 打造可维护的CSS

----
这辈子都不可能

{:&.rollIn}

[slide]

- 文件目录组织
- 命名规范
- 一些技巧
- 经典布局
- 样式声明先后顺序
- 几点忌讳

----
我说说而已，别当真

{:&.rollIn}

[slide]

## 文件目录组织

```sh
├── global.less # import reset & common style
├── app.js
├── pages
│   └── page1
│       ├── index.js
│       ├── index.less
│       ├── util.js
│       └── components
└── styles
    ├── variable.less # variable & theme
    ├── mixin.less
    └── reset.less
```

> 大概就是如此。需要注意的是，充分发挥 mixin & variable

[slide]

## 命名规范

> 一般而言，我会尝试把 css 作为这样这几类。很多文章也会把 前端比作房子。我们也可以尝试把 css 比作房子

1. 地基和材料决定房子能做成什么样子【兼容性要求和设计】
2. 户型选择【整体布局 Layout】
3. 房间内也大有天地 【局部布局 container、left、right...】
4. 装修顺序很重要【待会讲】

> 常见的命名有诸如 bem 等【在 公共样式中比较重要】。链接符之争 驼峰、中划线、下划线

[slide]

## 一些技巧

1. 尽量继承【文本设置，如 font-size\color\line-height等】
2. 抽象 mixin 【Bootstrap 时期习惯多个 class 样式叠加】
3. 别写死【设计稿不能resize宽度，可是网页会】
4. 细微的性能优化【文档流、重绘和重排、gpu等】

[slide]

```css
body {
  font-size: 14px;
  line-height: 1.3;
  color: #333;
}

@mixin border {
  /* ... */
}

@mixin center {
  /* ... */
}

.item-con {
  @include border;
  @include center;
}

/* <div class="mr-20 btn">btn</div> */

.content {
  width: 80%;
  display: flex;
  flex-wrap: wrap;
}

```

[slide]

## 样式声明先后顺序

单个样式规则下的属性在书写时，应按功能进行分组，并以 Positioning Model > Box Model > Typographic > Visual 的顺序书写，提高代码的可读性。

1. 如果包含 content 属性，应放在最前面；
2. Positioning Model 布局方式、位置，相关属性包括：position / top / right / bottom / left / z-index / display / float / ...
3. Box Model 盒模型，相关属性包括：width / height / padding / margin / border / overflow / ...
4. Typographic 文本排版，相关属性包括：font / line-height / text-align / word-wrap / ...
5. Visual 视觉外观，相关属性包括：color / background / list-style / transform / animation / transition / ...

> Positioning 处在第一位，因为他可以使一个元素脱离正常文本流，并且覆盖盒模型相关的样式。盒模型紧跟其后，因为他决定了一个组件的大小和位置。其他属性只在组件内部起作用或者不会对前面两种情况的结果产生影响，所以他们排在后面。

[slide]

## 几点忌讳

1. 默认继承却强制再次声明，不利全局修改
2. 改变权重顺序 !important【尽量少用，别为了图方便，就用这种方式】
3. 反复使用同一个类名声明样式
4. 嵌套过深
5. 写样式没套路【尽量划清职责】
6. 配合react，display 和 null
