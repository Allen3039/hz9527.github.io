## 简单的中间件
<b class="update-time">{{1528909418611 | formatTime}}</b><b class='type'>js</b>
<b class='kw'>middleware</b> <b class='kw'>中间件</b> <b class='kw'>中间件实现</b>

> 不论是在`express`中还是`koa`中，中间件大概是出场频次最高的词之一，我们享受`app.use(exector)`这种方式，那么我们是否也能自己实现一个简单的中间件类？
### 基本思路
在设计模式中，中间件就是责任链模式的体现