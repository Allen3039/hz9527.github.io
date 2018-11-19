webpackJsonp([1],{F8VJ:function(s,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e={render:function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("section",[a("h2",{attrs:{id:"函数'对象'"}},[s._v("函数'对象'")]),s._v(" "),a("div",{staticClass:"aside-menu"},[a("div",{directives:[{name:"toggle",rawName:"v-toggle"}],staticClass:"aside-menu-tit"},[s._v("menu")]),s._v(" "),s._m(0)]),a("b",{staticClass:"update-time"},[s._v(s._s(s._f("formatTime")(1542099017101)))]),a("b",{staticClass:"type"},[s._v("js")]),s._v(" "),a("b",{staticClass:"kw"},[s._v("axios实现")]),s._v(" "),a("b",{staticClass:"kw"},[s._v("apply实现")]),s._v(" "),a("b",{staticClass:"kw"},[s._v("bind实现")]),s._v(" "),s._m(1),s._v(" "),a("p",[s._v("如果用过 axios，也会发现起 api 设计的神奇之处，调用风格如下：")]),s._v(" "),s._m(2),s._v(" "),s._m(3),s._v(" "),a("p",[s._v("是时候复习一下原型相关的知识了")]),s._v(" "),s._m(4),s._v(" "),s._m(5),s._v(" "),s._m(6),s._v(" "),s._m(7),s._v(" "),a("h3",{attrs:{id:"回到第一题"}},[s._v("回到第一题")]),s._v(" "),s._m(8),s._v(" "),a("h4",{attrs:{id:"add方法分析"}},[s._v("add方法分析")]),s._v(" "),s._m(9),s._v(" "),a("h4",{attrs:{id:"add方法实现"}},[s._v("add方法实现")]),s._v(" "),s._m(10),s._v(" "),a("h3",{attrs:{id:"axios实现"}},[s._v("axios实现")]),s._v(" "),s._m(11),s._v(" "),a("h4",{attrs:{id:"分析"}},[s._v("分析")]),s._v(" "),a("p",[s._v("现在思路应该清晰一点了吧？")]),s._v(" "),s._m(12),s._v(" "),a("p",[s._v("当然实际操作并不是这样的")]),s._v(" "),s._m(13),s._v(" "),a("p",[s._v("个人比较倾向第二种方案。方案 2 虽然比较节省内存也方便管理（不需要拷贝默认值，父级更改不影响子级）。但是场景是 get 操作会比较频繁， set 操作比较少，而且 config 不是一个巨大的对象")]),s._v(" "),a("h4",{attrs:{id:"实现"}},[s._v("实现")]),s._v(" "),s._m(14),s._v(" "),s._m(15),s._v(" "),s._m(16),s._v(" "),s._m(17),s._v(" "),a("h3",{attrs:{id:"一些思考"}},[s._v("一些思考")]),s._v(" "),s._m(18),s._v(" "),s._m(19),s._v(" "),s._m(20),s._v(" "),s._m(21),s._v(" "),a("p",[s._v("方案1 比较适合暴露的类由开发者自己使用，可以随意销毁。方案2 比较适合新的类来控制，比如提供生命周期，通过 destroy 来销毁（比如实现一个 MVVM 框架）")]),s._v(" "),a("p",[s._v("另外 函数对象其实还挺有意思的，函数还可以像对象一样。细思极恐的事来了，我们知道 Function.prototype (嗯，按道理它是一个对象，对，它继承自 Object.prototype)，可它还偏偏还可以被调用 callable")]),s._v(" "),s._m(22)])},staticRenderFns:[function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"aside-menu-con"},[t("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#回到第一题"}},[this._v("回到第一题")]),t("a",{staticClass:"level-4 aside-menu-item",attrs:{href:"#add方法分析"}},[this._v("add方法分析")]),t("a",{staticClass:"level-4 aside-menu-item",attrs:{href:"#add方法实现"}},[this._v("add方法实现")]),t("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#axios实现"}},[this._v("axios实现")]),t("a",{staticClass:"level-4 aside-menu-item",attrs:{href:"#分析"}},[this._v("分析")]),t("a",{staticClass:"level-4 aside-menu-item",attrs:{href:"#实现"}},[this._v("实现")]),t("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#一些思考"}},[this._v("一些思考")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("blockquote",[t("p",[this._v("从一道面试题说起\n实现一个 add 方法，如 add(1)(2)(3)(4).getValue() // 返回相加结果")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("pre",{pre:!0},[t("code",{attrs:{"v-pre":"",class:"language-js"}},[this._v("axios(config)\naxios.defaults.headers.common["),t("span",{attrs:{class:"hljs-string"}},[this._v("'xx'")]),this._v("] = "),t("span",{attrs:{class:"hljs-string"}},[this._v("'yy'")]),this._v("\n"),t("span",{attrs:{class:"hljs-keyword"}},[this._v("const")]),this._v(" instance = axios.create(config)\ninstance(config)\n...\n")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("p",[this._v("如果只是使用到不觉奇怪，但是仔细看了一下，不对啊。这 axios 到底是函数还是对象？还能继承？！"),t("br"),this._v("\n谁说函数就不是对象了？")])},function(){var s=this.$createElement,t=this._self._c||s;return t("details",{attrs:{open:"true"}},[t("summary",[t("b",[this._v("一张图了解 prototype constructor __proto__ ")])]),this._v(" "),t("p",[t("img",{attrs:{src:a("ggbb"),alt:""}})])])},function(){var s=this.$createElement,t=this._self._c||s;return t("p",[t("strong",[this._v("总结：")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ol",[a("li",[s._v("所有函数的构造函数都是 Function，包括它自己")]),s._v(" "),a("li",[s._v("所有普通对象、所有函数的原型都继承自 Object.prototype，包括 Function.prototype")]),s._v(" "),a("li",[s._v("所有函数都继承自 Function.prototype (它其实也是一个 function)")]),s._v(" "),a("li",[s._v("Object.prototype （你丫不也是一个对象吗？）继承自 null")]),s._v(" "),a("li",[s._v("Function.prototype （你丫不也是一个函数吗？）的原型是 undefined")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("blockquote",[t("p",[this._v("不是有那么一句话嘛，一切皆对象。所以函数也是对象啊")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("p",[this._v("好的，我们先回到第一个题目，实现 "),t("code",{pre:!0},[this._v("add(1)(2)(3).getValue()")]),this._v("。")])},function(){var s=this.$createElement,t=this._self._c||s;return t("p",[this._v("乍一看像极了柯里化，可是是柯里化吗？不是啊，因为不确定嵌套几层，但是方向是对的，返回了一个函数"),t("br"),this._v("\n但是还可以调用 getValue 而且存了一个值。这个简单，函数不也是对象吗？那我就给你加上这些属性呗，然后把你给返回出去")])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0},[a("code",{attrs:{"v-pre":"",class:"language-js"}},[a("span",{attrs:{class:"hljs-meta"}},[s._v("'use strict'")]),s._v(";\n"),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),a("span",{attrs:{class:"hljs-title"}},[s._v("add")]),s._v(" ("),a("span",{attrs:{class:"hljs-params"}},[s._v("v = "),a("span",{attrs:{class:"hljs-number"}},[s._v("0")])]),s._v(") ")]),s._v("{\n  add.value += v;\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" add; "),a("span",{attrs:{class:"hljs-comment"}},[s._v("// 这里就不要 arguments.callee 了")]),s._v("\n}\nadd.value = "),a("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v(";\nadd.getValue = "),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" ("),a("span",{attrs:{class:"hljs-params"}}),s._v(") ")]),s._v("{\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" add.value;\n}\n\nadd("),a("span",{attrs:{class:"hljs-number"}},[s._v("1")]),s._v(")("),a("span",{attrs:{class:"hljs-number"}},[s._v("2")]),s._v(")("),a("span",{attrs:{class:"hljs-number"}},[s._v("3")]),s._v(").getValue();\n")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("blockquote",[t("p",[this._v("axios 在设置 defaults 前 instance 就被 create，defaults 并不会添加到 instance 配置项中。instance 没有 create 方法\n那我们来个更复杂的 父 axios 在 子 axios 创建后 设置 defaults，在 axios 调用其请求方法，仍其作用，子 axios 还有 create 方法")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("ol",[t("li",[this._v("axios 是一个函数，假设有一个 Axios 类，这个函数就是 Axios 类的 request 方法")]),this._v(" "),t("li",[this._v("axios 拥有 Axios 实例的所有方法，axios.create 返回的 子 axios “继承自” axios 的 Axios 实例")]),this._v(" "),t("li",[this._v("类似原型链 axios 在获取 config 时会沿着 “原型链” 向上查找")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("ol",[t("li",[this._v("有一个 Axios 类，并暴露一定方法，可以让 axios 获得")]),this._v(" "),t("li",[this._v("创建 axios 时，先传入 parent ，实例化一个 Axios 对象，setchild，将其所有 key 绑定到 axios 上并将 this 指向 Axios 实例")]),this._v(" "),t("li",[this._v("关于设置 defaults 有两种方案 1）代理其 get 与 set，在 get 时延 parent 递归合并配置； 2）更改 defaults 时告知每一个 child，child 来生成新的 config")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("blockquote",[t("p",[this._v("由于发送请求大致差不多，获取配置、xhr 函数在此省略")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0},[a("code",{attrs:{"v-pre":"",class:"language-js"}},[a("span",{attrs:{class:"hljs-comment"}},[s._v("// extends 实现")]),s._v("\n"),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),a("span",{attrs:{class:"hljs-title"}},[s._v("AxiosFactory")]),s._v("("),a("span",{attrs:{class:"hljs-params"}},[s._v("config, target")]),s._v(") ")]),s._v("{\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" axios = target ? target.create(config) : "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Axios(config, parent)\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" result = axios.request\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("for")]),s._v(" ("),a("span",{attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" key "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("in")]),s._v(" axios) {\n    "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" ("),a("span",{attrs:{class:"hljs-keyword"}},[s._v("typeof")]),s._v(" axios[key] === "),a("span",{attrs:{class:"hljs-string"}},[s._v("'function'")]),s._v(") {\n      result[key] = axios[key].bind(axios)\n    }\n  }\n  result.create = "),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),a("span",{attrs:{class:"hljs-params"}},[s._v("conf")]),s._v(") ")]),s._v("{\n    "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" AxiosFactory(conf, axios)\n  }\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" result\n}\n\n"),a("span",{attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" axios = AxiosFactory({})\n\n"),a("span",{attrs:{class:"hljs-keyword"}},[s._v("export")]),s._v(" "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("default")]),s._v(" axios\n\n")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0},[a("code",{attrs:{"v-pre":"",class:"language-js"}},[a("span",{attrs:{class:"hljs-comment"}},[s._v("// Axios.js")]),s._v("\n"),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),a("span",{attrs:{class:"hljs-title"}},[s._v("decorator")]),s._v("("),a("span",{attrs:{class:"hljs-params"}},[s._v("conf = {enumerable: true}")]),s._v(") ")]),s._v("{\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),a("span",{attrs:{class:"hljs-params"}},[s._v("target, name, descriptor")]),s._v(") ")]),s._v("{\n    "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("Object")]),s._v(".assign({}, descriptor, conf)\n  }\n}\n\n"),a("span",{attrs:{class:"hljs-class"}},[a("span",{attrs:{class:"hljs-keyword"}},[s._v("class")]),s._v(" "),a("span",{attrs:{class:"hljs-title"}},[s._v("Axios")]),s._v(" ")]),s._v("{\n  parent = "),a("span",{attrs:{class:"hljs-literal"}},[s._v("null")]),s._v("\n  children = []\n  config = {}\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("constructor")]),s._v("(conf) {\n    "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".config = conf;\n    "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".interceptors = {\n      "),a("span",{attrs:{class:"hljs-attr"}},[s._v("request")]),s._v(": xx,\n      "),a("span",{attrs:{class:"hljs-attr"}},[s._v("response")]),s._v(": xx\n    }\n  }\n  @decorator()\n  create(conf) {\n    "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" axios = "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Axios(conf);\n    axios.parent = "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(";\n    "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".children.push(axios);\n    "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" axios;\n  }\n  @decorator()\n  request() {}\n}\n\n")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("p",[this._v("整体来说关键在于工厂函数里将 axios 所有方法调用者指向 Axios实例。整个设计看起来像是隐藏 Axios 实例，从而保证了 Axios 实例 更加安全。"),t("br"),this._v("\n比如开发者如果去观察 axios，除了 ‘原型方法’ 可以没有任何 ‘实例属性’(这里暴露了 interceptors)，如果开发者贸然手动更改 ‘实例属性’ 可能使得代码不能运行")])},function(){var s=this.$createElement,t=this._self._c||s;return t("p",[this._v("正如上面所说，我们只暴露应该可以被开发者访问的属性或者方法，其实就是代理模式。举个例子，比如我们想实现 Promise 垫片。我们知道 Promise 实例并没有 state task value 这些，而是一个单纯的对象，有个 then 方法还是原型上的，所以我们可以通过代理把内部维护的 PromiseStatus PromiseValue ‘隐藏’ ，当然这还是不优雅，有没有更好的方案？"),t("br"),this._v("\n假设我们封装了一个构造器函数，我们希望实例有一些内部维护的数据，但是不希望开发者去访问和使用，如果是模块化比较好办，但很多模块化方案就是闭包啊")])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0},[a("code",{attrs:{"v-pre":"",class:"language-js"}},[s._v("("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" ("),a("span",{attrs:{class:"hljs-params"}}),s._v(") ")]),s._v("{\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" CacheData = {} "),a("span",{attrs:{class:"hljs-comment"}},[s._v("// 存放实例 id 和 data")]),s._v("\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" lastId = "),a("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v("\n  "),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),a("span",{attrs:{class:"hljs-title"}},[s._v("A")]),s._v("("),a("span",{attrs:{class:"hljs-params"}}),s._v(") ")]),s._v("{\n    "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".id = lastId++;\n    CacheData["),a("span",{attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".id] = {}\n  }\n\n  "),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("."),a("span",{attrs:{class:"hljs-title"}},[s._v("prototype")]),s._v("."),a("span",{attrs:{class:"hljs-title"}},[s._v("b")]),s._v(" = "),a("span",{attrs:{class:"hljs-title"}},[s._v("function")]),s._v("("),a("span",{attrs:{class:"hljs-params"}},[s._v("v")]),s._v(") ")]),s._v("{\n    CacheData["),a("span",{attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".id].c = v\n  }\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("window")]),s._v(".A = A\n})()\n")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("p",[this._v("这样只暴露了 id 给开发者，而开发者却访问不到 id 对应的 ‘内部数据’"),t("br"),this._v("\n假设我们需要实现一个类，这个类内部做了一些数据缓存")])},function(){var s=this.$createElement,t=this._self._c||s;return t("ol",[t("li",[this._v("一种方式是通过一个工厂函数返回一个类实例的代理对象，但这种方式首先是 new 显得无意义，另一方面是每次创建代理还需要进行一次拷贝（虽然拷贝的是引用）")]),this._v(" "),t("li",[this._v("只是暴露一个 id，但是 使用者无法访问 id 对应的数据，当然这种方式也有坏处，当实例被销毁时对应的数据无法感知，可能导致内存泄漏，或者说不必要的内存使用")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("p",[t("b",{staticClass:"show-blog"},[this._v("true")])])}]},n=a("VU/8")(null,e,!1,null,null,null);t.default=n.exports},W6gf:function(s,t,a){s.exports=a("F8VJ")},ggbb:function(s,t,a){s.exports=a.p+"static/img/prototype.374e8f9.jpg"}});
//# sourceMappingURL=1.8266e687eca111fd25d4.js.map