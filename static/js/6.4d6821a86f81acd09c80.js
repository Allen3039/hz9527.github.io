webpackJsonp([6],{"9d6e":function(s,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e={render:function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("section",[t("h2",{attrs:{id:"小程序 setData 代理方案"}},[s._v("小程序 setData 代理方案")]),s._v(" "),s._m(0),s._v(" "),t("h3",{attrs:{id:"init"}},[s._v("init")]),s._v(" "),s._m(1),s._v(" "),s._m(2),s._v(" "),t("h3",{attrs:{id:"setData"}},[s._v("setData")]),s._v(" "),s._m(3),s._v(" "),t("h4",{attrs:{id:"思考"}},[s._v("思考")]),s._v(" "),t("p",[s._v("如果我们通过重写 Page 方法，在 内部重写 Options 钩子函数，在钩子函数里拿到 this，并将 this.data 变成 Observer 会发生什么？\n假设我们代理一层 set")]),s._v(" "),s._m(4),s._v(" "),s._m(5),s._v(" "),t("h5",{attrs:{id:"问题"}},[s._v("问题")]),s._v(" "),s._m(6),s._v(" "),t("p",[s._v("如果必须用这种 代理 set 方案 呢？")]),s._v(" "),t("h5",{attrs:{id:"解决方案"}},[s._v("解决方案")]),s._v(" "),s._m(7),s._v(" "),t("h5",{attrs:{id:"锁机制？"}},[s._v("锁机制？")]),s._v(" "),t("p",[s._v("锁机制很好理解，但是到底该如何使用？")]),s._v(" "),s._m(8),s._v(" "),t("p",[s._v("哪种更好？")]),s._v(" "),s._m(9),s._v(" "),s._m(10),s._v(" "),s._m(11),s._v(" "),t("h5",{attrs:{id:"代理 this.data key 的set 行为 最终方案"}},[s._v("代理 this.data key 的set 行为 最终方案")]),s._v(" "),t("p",[s._v("我们再来看这段代码")]),s._v(" "),s._m(12),s._v(" "),t("p",[s._v("是不是有思路了？ 你不是 for 吗？我让你 for 不到不就行了，反正回头你会做 JSON.stringify 但是 这样会拿到一个空对象，但是思路是类似的")]),s._v(" "),t("p",[s._v("我们代理一个特别简单的属性，然后在其get上添加各种 key，这样就可以保证后续拿到的就是一个我们想要的 data，但是会给这个 data 添加一个不必要的属性，总之就是欺骗 for 循环")]),s._v(" "),s._m(13),s._v(" "),t("p",[s._v("拷贝方式更简单，一定程度也只是做了映射，但是this.data this.$data 好像有点谜。另外如果 data 很大呢？")]),s._v(" "),s._m(14),s._v(" "),s._m(15),s._v(" "),t("h3",{attrs:{id:"设计思路"}},[s._v("设计思路")]),s._v(" "),s._m(16),s._v(" "),s._m(17),s._v(" "),t("p",[s._v("微信小程序 setData 代码")]),s._v(" "),s._m(18),s._v(" "),t("div",{staticClass:"aside-menu"},[t("div",{directives:[{name:"toggle",rawName:"v-toggle"}],staticClass:"aside-menu-tit"},[s._v("menu")]),s._v(" "),s._m(19)]),t("b",{staticClass:"show-blog"},[s._v("true")])])},staticRenderFns:[function(){var s=this.$createElement,a=this._self._c||s;return a("blockquote",[a("p",[this._v("首先需要理解小程序 setData 做了什么。微信官方如是说：小程序的视图层目前使用 WebView 作为渲染载体，而逻辑层是由独立的 JavascriptCore 作为运行环境。在架构上，WebView 和 JavascriptCore 都是独立的模块，并不具备数据直接共享的通道。当前，视图层和逻辑层的数据传输，实际上通过两边提供的 evaluateJavascript 所实现。即用户传输的数据，需要将其转换为字符串形式传递，同时把转换后的数据内容拼接成一份 JS 脚本，再通过执行 JS 脚本的形式传递到两边独立环境。\n而 evaluateJavascript 的执行会受很多方面的影响，数据到达视图层并不是实时的。")])])},function(){var s=this.$createElement,a=this._self._c||s;return a("ol",[a("li",[this._v("检测 data 并 JSON parse stringify 一次")]),this._v(" "),a("li",[this._v("初始化生命周期钩子")]),this._v(" "),a("li",[this._v("其他的重写方法（做性能监控），克隆对象 （如 props， 方法，总之是非生命周期钩子和 data）")])])},function(){var s=this.$createElement,a=this._self._c||s;return a("blockquote",[a("p",[this._v("所以别想在 options 写法里动手脚了")])])},function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("pre",{pre:!0},[t("code",{attrs:{"v-pre":"",class:"language-js"}},[t("span",{attrs:{class:"hljs-comment"}},[s._v("// 去掉不影响主流程代码")]),s._v("\nsetData (newData, completeCb = noop) {\n  "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// 判断 newData 是合法的 （Object）")]),s._v("\n  "),t("span",{attrs:{class:"hljs-comment"}},[s._v('// path "arr[0].hello[1].world"')]),s._v("\n  "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("for")]),s._v(" ("),t("span",{attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" path "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("in")]),s._v(" newData) {\n    "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// 根据 keyStr 获取 子 Object 顶点和 顶点 对象。过程中可能有两种情况")]),s._v("\n    "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// 假设 keysStr a.b.c;")]),s._v("\n    "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// 1. this.data {a: {b: 1}}; obj {c: undefined}, key c; 注意 会为 this.data 一些节点添加 空对象和数组")]),s._v("\n    "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// 2. this.data {a: {b: {c: 2}}}; obj {c: 2}, key c; 注意 {c: 2} 是 this.data.a.b 的引用")]),s._v("\n    "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" {obj, key} = getObjectByPath("),t("span",{attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".data, path); "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// 获取一个结果")]),s._v("\n    "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// 修改 obj 中 某个 key 的值。注意 obj 是 this.data 某个 子对象的引用，所以也会修改 this.data")]),s._v("\n    obj && (obj[key] = deepClone(newData[path]));\n  }\n  "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// 派发 dataChange 事件 给 native 等等，上面弄了半天好像根本对这里就没影响啊！！！！")]),s._v("\n  wx.emit({"),t("span",{attrs:{class:"hljs-attr"}},[s._v("data")]),s._v(": newData}, "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".__wxWebviewId__, t)\n}\n\n"),t("span",{attrs:{class:"hljs-function"}},[t("span",{attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{attrs:{class:"hljs-title"}},[s._v("getObjectByPath")]),s._v(" ("),t("span",{attrs:{class:"hljs-params"}},[s._v("data, keyStr")]),s._v(") ")]),s._v("{\n  "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" keys = parsePath(keyStr)\n  "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" result = {}\n  "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" key = "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("void")]),s._v(" "),t("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v(";\n  "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" oldData = data;\n  "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("for")]),s._v(" ("),t("span",{attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" ind = "),t("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v("; ind < keys.length; ind++) {\n    "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" curKey = keys[ind]\n    "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// 以下 ifelse 就是判断原此节点和现此数据节点数据类型是否一致")]),s._v("\n    "),t("span",{attrs:{class:"hljs-comment"}},[s._v("/**\n      data: {a: 1, b: ''}\n      keys: ['a', 0]\n      \b循环前 oldData {a: 1, b: ''} result {}\n      第一次循环结束后 result {a: 1, b: ''}; oldData 1\n      第二次循环 result.a = []\n      注意，一开始将 this.data 将引用给 oldData 第一轮循环结束 oldData 将引用给 result。所以会给 this.data 添加 空数组、空对象 属性\n    */")]),s._v("\n    "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" ("),t("span",{attrs:{class:"hljs-built_in"}},[s._v("Number")]),s._v("(curKey) === curKey && curKey % "),t("span",{attrs:{class:"hljs-number"}},[s._v("1")]),s._v(" == "),t("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v(") {\n      "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" (!"),t("span",{attrs:{class:"hljs-built_in"}},[s._v("Array")]),s._v(".isArray(oldData)) { "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// 原父节点数据不是数组")]),s._v("\n        result[preKey] = [];\n        oldData = result[preKey]\n      }\n    } "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("else")]),s._v(" {\n      "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" (getDataType(oldData) !== "),t("span",{attrs:{class:"hljs-string"}},[s._v("'Object'")]),s._v(") { "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// 原父节点数据不是对象")]),s._v("\n        result[preKey] = {}\n        oldData = result[preKey]\n      }\n    }\n    preKey = curKey;\n    result = oldData;\n    oldData = oldData[curKey];\n  }\n  \b"),t("span",{attrs:{class:"hljs-comment"}},[s._v("// obj 根据 keys 获得的叶子对象或数组，key 则是这个叶子对象顶点，如：")]),s._v("\n  "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// this.data {a: {b: 1}} keyStr a.b =>  obj {b: 1} key b")]),s._v("\n  "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// 复杂一点 this.data {a: {b: 1, c: 2}} keyStr a.b => obj {b: 1, c: 2} key b")]),s._v("\n  "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" {\n    "),t("span",{attrs:{class:"hljs-attr"}},[s._v("obj")]),s._v(": result, "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// obj是包含 key 的最小一层对象，可以是数组")]),s._v("\n    key: preKey, "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// key是原始 key 的最小一层值，可以是数字（下标）")]),s._v("\n  };\n}\n")])])},function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("pre",{pre:!0},[t("code",{attrs:{"v-pre":"",class:"language-js"}},[t("span",{attrs:{class:"hljs-comment"}},[s._v("// data {a: 1, b: 2}")]),s._v("\n"),t("span",{attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".data.a = "),t("span",{attrs:{class:"hljs-number"}},[s._v("3")]),s._v(" "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// set notify => setData => obj: {a: 1, b: 2} key a => obj.a = 2 不会使得 Observer 关系变乱")]),s._v("\n"),t("span",{attrs:{class:"hljs-comment"}},[s._v("// 这里之所以 不会变乱 是因为 3 是一个 基本数据类型，而 get this.data.a 就是这个，所以不会 触发 set，而当 a 的值是一个引用呢？")]),s._v("\n")])])},function(){var s=this.$createElement,a=this._self._c||s;return a("p",[this._v("代理多层也是一样的道理，问题在于 "),a("code",{pre:!0},[this._v("obj[key] = deepClone(newData[keyStr])")]),this._v(" 然后就会 不断 set => setData => set ...")])},function(){var s=this.$createElement,a=this._self._c||s;return a("ol",[a("li",[this._v("我们想解决什么问题？ 频繁 setData 带来的性能问题，我们希望截流，让开发者不用思考 setData 是否会带来性能问题")]),this._v(" "),a("li",[this._v("为什么代理 set 行为？ 一方面通过这种方式帮助开发者在合适的时机 setData，另一方面不需要显式调用 setData")])])},function(){var s=this.$createElement,a=this._self._c||s;return a("ol",[a("li",[this._v("拷贝一个 data，我们暴露给开发者另一个对象比如 this.$data，然后将 set this.$data 将其行为复制给 this.data")]),this._v(" "),a("li",[this._v("我们在 set 行为加一个 锁机制")])])},function(){var s=this.$createElement,a=this._self._c||s;return a("ol",[a("li",[this._v("忽略 开发者的 set 行为。即开发者 set 只触发 notify，异步队列开始时 开锁，在 setData set 完成 锁上。")]),this._v(" "),a("li",[this._v("忽略 setData set 行为。即开发者 set 触发 notify & set，异步队列开始时 锁上，在 setData 完成 开锁。")])])},function(){var s=this.$createElement,a=this._self._c||s;return a("ol",[a("li",[this._v("锁住用户 set，会让 get 行为 延迟，而且不能保证数据一致性 （待会看示例）")]),this._v(" "),a("li",[this._v("锁住 setData set，那真是。。。帮你 parse keysStr， deepClone，你给我锁住了。不过 get 行为不会延迟，而且数据能保持一致")])])},function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("pre",{pre:!0},[t("code",{attrs:{"v-pre":"",class:"language-js"}},[t("span",{attrs:{class:"hljs-comment"}},[s._v("// 假设只做了一层代理")]),s._v("\n"),t("span",{attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" obj = {}\n\n"),t("span",{attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".data.a = obj "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// this.data {a: null}")]),s._v("\n\n"),t("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log("),t("span",{attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".data.a)\n"),t("span",{attrs:{class:"hljs-comment"}},[s._v("// 锁住用户 set：null")]),s._v("\n"),t("span",{attrs:{class:"hljs-comment"}},[s._v("// 锁住 setData set: {}")]),s._v("\n\nobj.b = "),t("span",{attrs:{class:"hljs-number"}},[s._v("1")]),s._v("\n\nsetTimeout("),t("span",{attrs:{class:"hljs-function"}},[t("span",{attrs:{class:"hljs-params"}},[s._v("()")]),s._v(" =>")]),s._v(" {\n  "),t("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log("),t("span",{attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".data.a.b)\n  "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// 两种都是 1，因为我们传递的是引用")]),s._v("\n  "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// 但是在 setData 完成后，更改 obj 的 key，锁住 用户 set 是不能响应的，因为 set 拿到的是 obj 的深克隆返回")]),s._v("\n}, "),t("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v(")\n\n")])])},function(){var s=this.$createElement,a=this._self._c||s;return a("blockquote",[a("p",[this._v("总体来看 锁住 setData set 行为好像更为合理，但是确实底层做的很多事感觉就白费了")])])},function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("pre",{pre:!0},[t("code",{attrs:{"v-pre":"",class:"language-js"}},[s._v("setData (newData, completeCb = noop) {\n  "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("for")]),s._v(" ("),t("span",{attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" path "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("in")]),s._v(" newData) {\n    "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" {obj, key} = getObjectByPath("),t("span",{attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".data, path); "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// 获取一个结果")]),s._v("\n    obj && (obj[key] = deepClone(newData[path]));\n  }\n  wx.emit({"),t("span",{attrs:{class:"hljs-attr"}},[s._v("data")]),s._v(": newData}, "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".__wxWebviewId__, t)\n}\n")])])},function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("pre",{pre:!0},[t("code",{attrs:{"v-pre":"",class:"language-js"}},[t("span",{attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" newData = {\n  "),t("span",{attrs:{class:"hljs-attr"}},[s._v("a")]),s._v(": {"),t("span",{attrs:{class:"hljs-attr"}},[s._v("b")]),s._v(": "),t("span",{attrs:{class:"hljs-number"}},[s._v("1")]),s._v("},\n  "),t("span",{attrs:{class:"hljs-string"}},[s._v("'b.c'")]),s._v(": "),t("span",{attrs:{class:"hljs-number"}},[s._v("1")]),s._v("\n}\n"),t("span",{attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" myNewData = {\n  "),t("span",{attrs:{class:"hljs-attr"}},[s._v("data")]),s._v(": "),t("span",{attrs:{class:"hljs-number"}},[s._v("2")]),s._v("\n}\n"),t("span",{attrs:{class:"hljs-built_in"}},[s._v("Object")]),s._v(".defineProperty(myNewData, "),t("span",{attrs:{class:"hljs-string"}},[s._v("'data'")]),s._v(", {\n  get() {\n    "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("for")]),s._v(" ("),t("span",{attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" key "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("in")]),s._v(" newData) {\n      myNewData[key] = newData[key]\n    }\n    "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("delete")]),s._v(" myNewData.data\n    "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// 建议不要删，因为有可能有检测机制导致报错。总之我们的目的只是 骗过 for。")]),s._v("\n    "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// 当然 返回 undefined 和删除其实是一样。而且 JSON.stringify 也会忽略 值为 undefined 的 key")]),s._v("\n    "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("void")]),s._v(" "),t("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v("\n  }\n})\n\n"),t("span",{attrs:{class:"hljs-function"}},[t("span",{attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{attrs:{class:"hljs-title"}},[s._v("setData")]),s._v("("),t("span",{attrs:{class:"hljs-params"}},[s._v("data, cb")]),s._v(") ")]),s._v("{\n  "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("for")]),s._v(" ("),t("span",{attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" key "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("in")]),s._v(" data) { "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// 这里并不会调用 get，所以只能拿到一个 key")]),s._v("\n    "),t("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log(key, data[key]) "),t("span",{attrs:{class:"hljs-comment"}},[s._v("// 如果不访问 data.key 是不会调用 getter")]),s._v("\n  }\n  "),t("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log(data)\n  "),t("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log("),t("span",{attrs:{class:"hljs-built_in"}},[s._v("JSON")]),s._v(".stringify(data))\n}\nsetData(myNewData)\n")])])},function(){var s=this.$createElement,a=this._self._c||s;return a("p",[this._v("但是两者主流程是一致，开发者使用类似 "),a("code",{pre:!0},[this._v("this.data.a = xx")]),this._v("，然后在 set 里记录，最后计算一个合理的 newData，执行 setData")])},function(){var s=this.$createElement,a=this._self._c||s;return a("p",[a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify"}},[this._v("JSON.stringify")]),this._v(" "),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get"}},[this._v("getter")])])},function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ol",[t("li",[s._v("重写 Page，重写 Options onLoad")]),s._v(" "),t("li",[s._v("onLoad 代理 data（注意第一个锁机制，在 onHide set 会进行，但是 不会run，会在onShow run）")]),s._v(" "),t("li",[s._v("更改 data 会将变化的 key value 通知给 upper")]),s._v(" "),t("li",[s._v("upper 将结果 push 队列判断是否需要 run 一个异步，异步 then 里计算 newData, 操作 setData")]),s._v(" "),t("li",[s._v("卸载页面可以清空代理（其实无所谓）")])])},function(){var s=this.$createElement,a=this._self._c||s;return a("blockquote",[a("p",[this._v("附：")])])},function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("pre",{pre:!0},[t("code",{attrs:{"v-pre":"",class:"language-js"}},[t("span",{attrs:{class:"hljs-comment"}},[s._v("// setData")]),s._v("\n"),t("span",{attrs:{class:"hljs-function"}},[t("span",{attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),t("span",{attrs:{class:"hljs-params"}},[s._v("state, callback")]),s._v(") ")]),s._v("{\n  "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("try")]),s._v(" {\n    "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" type = ("),t("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v(", a.getDataType)(state);\n    "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" ("),t("span",{attrs:{class:"hljs-string"}},[s._v('"Object"')]),s._v(" !== type)\n      "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("void")]),s._v(" ("),t("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v(", a.error)("),t("span",{attrs:{class:"hljs-string"}},[s._v('"类型错误"')]),s._v(", "),t("span",{attrs:{class:"hljs-string"}},[s._v('"setData accepts an Object rather than some "')]),s._v(" + type);\n    "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("for")]),s._v(" ("),t("span",{attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" key "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("in")]),s._v(" state) {\n      "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("void")]),s._v(" "),t("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v(" === state[key] && ("),t("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v(", a.error)("),t("span",{attrs:{class:"hljs-string"}},[s._v('"Page setData warning"')]),s._v(", "),t("span",{attrs:{class:"hljs-string"}},[s._v("'Setting data field \"'")]),s._v(" + o + "),t("span",{attrs:{class:"hljs-string"}},[s._v("'\" to undefined is invalid.'")]),s._v(");\n      "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" r = ("),t("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v(", u.getObjectByPath)("),t("span",{attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".data, key)\n      "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" data = r.obj\n      "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" s = r.key;\n      data && (data[s] = ("),t("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v(", f.default)(state[key]))\n    }\n    c.default.emit({\n      "),t("span",{attrs:{class:"hljs-attr"}},[s._v("data")]),s._v(": state\n    }, "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".__wxWebviewId__, t)\n  } "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("catch")]),s._v(" (e) {\n    ("),t("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v(",\n    a.errorReport)(e)\n  }\n}\n\nf.default\n"),t("span",{attrs:{class:"hljs-function"}},[t("span",{attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{attrs:{class:"hljs-title"}},[s._v("r")]),s._v("("),t("span",{attrs:{class:"hljs-params"}},[s._v("e")]),s._v(") ")]),s._v("{\n  "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" t = "),t("span",{attrs:{class:"hljs-built_in"}},[s._v("arguments")]),s._v(".length > "),t("span",{attrs:{class:"hljs-number"}},[s._v("1")]),s._v(" && "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("void")]),s._v(" "),t("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v(" !== "),t("span",{attrs:{class:"hljs-built_in"}},[s._v("arguments")]),s._v("["),t("span",{attrs:{class:"hljs-number"}},[s._v("1")]),s._v("] ? "),t("span",{attrs:{class:"hljs-built_in"}},[s._v("arguments")]),s._v("["),t("span",{attrs:{class:"hljs-number"}},[s._v("1")]),s._v("] : o;\n  "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" ("),t("span",{attrs:{class:"hljs-literal"}},[s._v("null")]),s._v(" === e)\n    "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),t("span",{attrs:{class:"hljs-literal"}},[s._v("null")]),s._v(";\n  "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" n = ("),t("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v(",\n  u.copyValue)(e);\n  "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" ("),t("span",{attrs:{class:"hljs-literal"}},[s._v("null")]),s._v(" !== n)\n    "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" n;\n  "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" r = ("),t("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v(",\n  u.copyCollection)(e, t)\n  , a = "),t("span",{attrs:{class:"hljs-literal"}},[s._v("null")]),s._v(" !== r ? r : e;\n  "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" i(e, t, a, [e], [a])\n}\nt.getObjectByPath = "),t("span",{attrs:{class:"hljs-function"}},[t("span",{attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),t("span",{attrs:{class:"hljs-params"}},[s._v("pageData, key")]),s._v(") ")]),s._v("{\n  "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("for")]),s._v(" ("),t("span",{attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" n = r(key), i = {}, a = "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("void")]),s._v(" "),t("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v(", u = pageData, s = "),t("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v("; s < n.length; s++)\n    "),t("span",{attrs:{class:"hljs-built_in"}},[s._v("Number")]),s._v("(n[s]) === n[s] && n[s] % "),t("span",{attrs:{class:"hljs-number"}},[s._v("1")]),s._v(" == "),t("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v(" ? "),t("span",{attrs:{class:"hljs-built_in"}},[s._v("Array")]),s._v(".isArray(u) || (i[a] = [],\n    u = i[a]) : ("),t("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v(",\n    o.isPlainObject)(u) || (i[a] = {},\n    u = i[a]),\n    a = n[s],\n    i = u,\n    u = u[n[s]];\n  "),t("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" {\n      "),t("span",{attrs:{class:"hljs-attr"}},[s._v("obj")]),s._v(": i,\n      "),t("span",{attrs:{class:"hljs-attr"}},[s._v("key")]),s._v(": a\n  }\n}\n\n")])])},function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("div",{staticClass:"aside-menu-con"},[t("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#init"}},[s._v("init")]),t("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#setData"}},[s._v("setData")]),t("a",{staticClass:"level-4 aside-menu-item",attrs:{href:"#思考"}},[s._v("思考")]),t("a",{staticClass:"level-5 aside-menu-item",attrs:{href:"#问题"}},[s._v("问题")]),t("a",{staticClass:"level-5 aside-menu-item",attrs:{href:"#解决方案"}},[s._v("解决方案")]),t("a",{staticClass:"level-5 aside-menu-item",attrs:{href:"#锁机制？"}},[s._v("锁机制？")]),t("a",{staticClass:"level-5 aside-menu-item",attrs:{href:"#代理 this.data key 的set 行为 最终方案"}},[s._v("代理 this.data key 的set 行为 最终方案")]),t("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#设计思路"}},[s._v("设计思路")])])}]},n=t("VU/8")(null,e,!1,null,null,null);a.default=n.exports},sDzM:function(s,a,t){s.exports=t("9d6e")}});
//# sourceMappingURL=6.4d6821a86f81acd09c80.js.map