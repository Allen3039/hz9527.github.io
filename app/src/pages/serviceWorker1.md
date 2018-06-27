## serviceWorker系列一
<b class="update-time">{{1529302280810 | formatTime}}</b><b class="type">js</b>
<b class="kw">serviceWorker</b><b class="kw">sw基础</b>

### 什么是PWA？

> PWA并不是某种API，也不是依赖于native的诸如hybrid开发的技术方案，而是一种纯web借助于浏览器实现的技术方案，从其全称也可见一斑 —— `Progressive web apps`。

google官方给pwa的特性定义为：1）可靠 2）快 3） 体验好（接近原生的体验）[链接](https://developers.google.com/web/progressive-web-apps/)  

当然如何评价pwa还是仁者见仁智者见智的，个人认为pwa具有以下特点：

1. 渐进式支持（不兼容也不会使得应用不能使用，一种AOP方案吧）
2. 快，甚至可离线化
3. 高度可定制

在现在公司有一种本地缓存方案即将资源存储在localStorage内，这种方案优点是兼容性好，但是不能离线、存储大小限制、对代码有侵入。  
pwa则是依靠serviceWork中fetch事件拦截客户端请求，自行决定是通过cache返回请求还是从服务端请求。所以这种方式比localStorage的方式侵入性更小，因此也是其渐进性支持的基础。

### pwa的几个API

1. pwa最核心的api就是serviceWorker，起各方面的实现都是依赖这个API的
2. cacheStorage，存储资源API，这也是pwa能快、离线化的基础
3. Notification，实现web界面push
4. indexDB，可以辅助cacheStorage

> 再次强调，pwa只是一种技术方案，serviceWorker只是其核心，例如pwa实现缓存资源是依赖的cacheStorage（当然你也可以使用其他方式），而不是serviceWorker本身的能力。pwa的实现是多个web API实现的。

### serviceWorker

> serviceWorker也是一种worker类，其提供了客户端相关的接口与worker线程相关接口

在worker线程，serviceWorker能触发一些生命周期，也能触发一些事件。
#### serviceWorker客户端相关
#### serviceWo
