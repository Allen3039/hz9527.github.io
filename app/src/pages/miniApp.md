## 小程序架构

本人并没有成熟的小程序开发经验，如有错误请斧正，但是我相信原理应该是这样。  
我们可以想像在一个 app 内如何实现小程序。

* app 提供一个 `纯 js 执行环境`，并注入 JSSDK 即 `纯 js 执行环境` 与 native 通信。
* 创建 active，内部有一个 `webview` 组件，让 `纯 js 执行环境` 可以和 `webview` 相互通信。(todo)
* `webview` 可以和 `native` 通信。比如 `webview` 需要渲染一个 native 组件（取决于 wxml 结构)，`webview` 通知 native 去渲染一个 `native 组件` 覆盖在 `webview` 上，并注册对 `native 组件` 事件的监听 （取决于 wxml 是否监听了）。

总体来看，就是 `纯 js 执行环境` 只负责数据和逻辑，`webview` 只负责 UI （包括UI事件的通知和渲染）。`纯 js 执行环境` 和 native 及 `webview` 可以通信；`webview` 可以和 native 通信。两者与 native 通信的职责不同，前者是获取 native 的 api 能力，后者是 UI 能力。

> 这里及以下 `native 组件` 代指 非 webview 组件

todo 确定 `webview` 执行监听回掉是同步执行还是异步执行

[小程序开发指南](https://developers.weixin.qq.com/ebook?action=get_post_info&token=935589521&volumn=1&lang=zh_CN&book=miniprogram&docid=0008aeea9a8978ab0086a685851c0a)

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

待调研：

1. 父组件（页面）setData ，子组件此时单纯修改数据是否会渲染
2. 父组件（页面）与子组件同时调用 setData 会重复渲染吗？
3. 父组件（页面）setData，子组件 使用了上级 data 作为其 props，并代理了这个 props（代理内 setData）会在上级 setData 完成前还是完成后调用

完成前调用那么（其实好像没有必要）

## 问题

小程序不像 Vue，将 Vue 构造函数暴露给开发者，而是提供 类似 App，Page 这样的方法创建。但是方式很接近，都是传入一个 Options。相信很多开发者以为自己在写 Vue 实例，其实是在写 Options

1. data 初始化时，和 Vue 一样，会去拿到新的 data，只是前者依靠 JSON 化（或者深克隆，反正官方文档是说可 JSON 序列化对象），后者则是遍历 生成 Watcher 实例

这就意味着我们还不能直接返回一个 Observable 数据给 data，而应该在 onLoad 时去给 data 重新赋值


```js
/*
setData 主流程精简还原，并非完整主流程，内有注释
*/
function setData (obj) {
    if (typeof(obj) !== 'Object') {
        console.log('类型错误'); // 并没有预期中的return;
    }
    let type = 'appDataChange';

    // u.default.emit(e, this.__wxWebviewId__) 代码还原
    let e = [type, {
                data: {data: list},
                options: {timestamp: +new Date()}
            },
            [0] // this.__wxWebviewId__
    }];

    // WeixinJSBridge.publish.apply(WeixinJSBridge, e); 代码还原
    var datalength = JSON.stringify(e.data).length;  // 第一次 JSON.stringify
    if (datalength > AppserviceMaxDataSize) { // AppserviceMaxDataSize === 1048576
        console.error('已经超过最大长度');
        return;
    }

    if (type === 'appDataChange' || type === 'pageInitData' || type === '__updateAppData') {

        // sendMsgToNW({appData: __wxAppData, sdkName: "send_app_data"}) 代码还原
        __wxAppData = {
            'pages/page1/page1': alldata
        }
        e = { appData: __wxAppData, sdkName: "send_app_data" }

        var postdata = JSON.parse(JSON.stringify(e)); // 第二次 JSON.stringify 第一次 JSON.parse
        window.postMessage({
            postdata
        }, "*");
    }


    // sendMsgToNW({appData: __wxAppData, sdkName: "send_app_data"}) 代码还原
    e = {
        eventName: type,
        data: e[1],
        webviewIds: [0],
        sdkName: 'publish'
    };

    var postdata = JSON.parse(JSON.stringify(e));  // 第三次 JSON.stringify 第二次 JSON.parse
    window.postMessage({
        postdata
    }, "*");
}
function(e, t) {
  try {
      var n = (0,
      a.getDataType)(e);
      if ("Object" !== n)
          return void (0,
          a.error)("类型错误", "setData accepts an Object rather than some " + n);
      for (var o in e) {
          void 0 === e[o] && (0,
          a.error)("Page setData warning", 'Setting data field "' + o + '" to undefined is invalid.');
          var r = (0,
          u.getObjectByPath)(this.data, o)
            , i = r.obj
            , s = r.key;
          i && (i[s] = (0,
          f.default)(e[o]))
      }
      c.default.emit({
          data: e
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
t.getObjectByPath = function(e, t) {

  for (var n = r(t), i = {}, a = void 0, u = e, s = 0; s < n.length; s++)
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

todo

1. 组件和父页面同步 setData 渲染次数？ 查看回调是否在一次事件循环（一方面两次同步 invoke 导致回调异步）所以除了微队列判断外还需要 performance
2. trigger 是同步还是异步？虽然很好实现同步，但是文档说模拟组件事件，而且还可以冒泡
3. 子组件感知 props 变化是同步还是异步？

* 组件和父页面同步 setData 渲染次数是 1次，基本可以放心同步 setData，毕竟两个不同实例，无法一次 setData
* 如果 trigger 是异步有必要实现成同步吗？
* 如果 感知 props 变化是异步，有必要实现成同步吗？
* 如何拿到 Page/App/Component.prototype
