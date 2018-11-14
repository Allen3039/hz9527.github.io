## 事件循环-小程序

> 首先需要理解小程序 setData 做了什么。微信官方如是说：小程序的视图层目前使用 WebView 作为渲染载体，而逻辑层是由独立的 JavascriptCore 作为运行环境。在架构上，WebView 和 JavascriptCore 都是独立的模块，并不具备数据直接共享的通道。当前，视图层和逻辑层的数据传输，实际上通过两边提供的 evaluateJavascript 所实现。即用户传输的数据，需要将其转换为字符串形式传递，同时把转换后的数据内容拼接成一份 JS 脚本，再通过执行 JS 脚本的形式传递到两边独立环境。
而 evaluateJavascript 的执行会受很多方面的影响，数据到达视图层并不是实时的。

本人并没有成熟的小程序开发经验，如有错误请斧正，但是我相信原理应该是这样。  
我们可以想像在一个 app 内如何实现小程序。

* app 提供一个 `纯 js 执行环境`，并注入 JSSDK 即 `纯 js 执行环境` 与 native 通信。
* 创建 `native` 页面，内部有一个 `webview` 组件，让 `纯 js 执行环境` 可以和 `webview` 相互通信。(todo)
* `webview` 可以和 `native` 通信。比如 `webview` 需要渲染一个 native 组件（取决于 wxml 结构)，`webview` 通知 native 去渲染一个 `native 组件` 覆盖在 `webview` 上，并注册对 `native 组件` 事件的监听 （取决于 wxml 是否监听了）。

总体来看，就是 `纯 js 执行环境` 只负责数据和逻辑，`webview` 只负责 UI （包括UI事件的通知和渲染）。`纯 js 执行环境` 和 native 及 `webview` 可以通信；`webview` 可以和 native 通信。两者与 native 通信的职责不同，前者是获取 native 的 api 能力，后者是 UI 能力。

> 这里及以下 `native 组件` 代指 非 webview 组件

todo 确定 `webview` 执行监听回掉是同步执行还是异步执行

**解析：**  

我们可以回想小程序是页面需要 `wxml` `js` `wxss` `json` 。我们先忽略 `wxss` `json` 及 `API` 能力，`wxss` `json` 无非是告知渲染样式和一些配置，可能是 `native 组件` 的渲染也可能是 `webview` 中 h5 原生 dom，`API` 能力无非也是 Native 提供给 jscore 的一个 bridge （jssdk），因此这两部分可以看作是黑盒。只看 `wxml` `js`  
首先 `wxml` 可以理解为模版引擎，用于告知 `native` 页面 如何渲染 webview 和 native 组件，由于使用了模版，底层逃不开 MVVM 的思想。当 webview js引擎 接收到 data 变化会根据模版计算的结果重新渲染（至于内部是否使用了 vdom diff 这里可以不用管），当接收到了 UI 事件会去执行 `纯 js 执行环境` 注册的监听函数。  
其次 `js` 会响应事件（生命周期及 UI 事件），在相应方法里操作 setData。那么对于开发者来说除了有效的 `wxml` 布局设计外，合理使用 setData 就尤为关键了。  
setData 内部会同步更新 data，并将 参数 传递给 webview，由于涉及到通信肯定是 异步。那么 webview 拿到参数，计算新的布局并渲染。  
根据微信的文档，异步将 参数 传递给 webview 肯定是 宏队列。比如我们连续 setData 两次，那么第一次拿到 参数，计算布局、渲染。由于此时 webview 中 js引擎在执行第一次通信的结果，第二次通信被挂起（放在新的宏队列里）。

问题：  

1. 第一次拿到 参数，计算布局，然后执行渲染，如果此时 第二次通信还未被放到宏队列则会触发渲染。但如果已经放在宏队列里，理论上会继续计算布局，最后进行一次渲染
2. webview 如何执行 监听的回掉？

思考：  

`纯 js 执行环境` 与 `webview` 通信除了需要 `webview` js引擎空闲，还需要渲染完成才能被执行？