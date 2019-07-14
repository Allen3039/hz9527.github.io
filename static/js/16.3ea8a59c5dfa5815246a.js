webpackJsonp([16],{WCez:function(t,s,e){t.exports=e("v6Di")},v6Di:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("section",[e("div",{staticClass:"aside-menu"},[e("div",{directives:[{name:"toggle",rawName:"v-toggle"}],staticClass:"aside-menu-tit"}),t._m(0)]),e("h2",{attrs:{id:"async%26await%E6%AD%A3%E7%A1%AE%E7%9A%84%E6%89%93%E5%BC%80%E6%96%B9%E5%BC%8F-1"}},[t._v("async&await正确的打开方式")]),t._v(" "),e("p",[e("b",{staticClass:"update-time"},[t._v(t._s(t._f("formatTime")(1560771004219)))]),e("b",{staticClass:"type"},[t._v("js")]),t._v(" "),e("b",{staticClass:"kw"},[t._v("async")]),t._v(" "),e("b",{staticClass:"kw"},[t._v("await")]),t._v(" "),e("b",{staticClass:"kw"},[t._v("async&await使用")])]),t._v(" "),t._m(1),t._v(" "),e("h3",{attrs:{id:"%E5%BF%AB%E9%80%9F%E5%BC%80%E7%AE%B1-1"}},[t._v("快速开箱")]),t._v(" "),t._m(2),t._v(" "),e("h3",{attrs:{id:"%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9-1"}},[t._v("注意事项")]),t._v(" "),e("p",[t._v("通过快速开箱，想必已经对async有了基础的了解。那么开始简单对比下Promise会发现几个问题：")]),t._v(" "),t._m(3),t._v(" "),e("p",[t._v("先看看Promise解决回调地狱，并行，catch吧")]),t._v(" "),t._m(4),t._v(" "),e("p",[t._v("其实在我看来Promise已经")])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"aside-menu-con"},[s("a",{staticClass:"level-2 aside-menu-item",attrs:{href:"#async%26await%E6%AD%A3%E7%A1%AE%E7%9A%84%E6%89%93%E5%BC%80%E6%96%B9%E5%BC%8F-1"}},[this._v("async&await正确的打开方式")]),s("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#%E5%BF%AB%E9%80%9F%E5%BC%80%E7%AE%B1-1"}},[this._v("快速开箱")]),s("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9-1"}},[this._v("注意事项")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("blockquote",[s("p",[this._v("由于过去一直沉浸在Promise的世界里，对async和await使用较少，在此也谈谈自己的见解吧")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("x"),s("a",{attrs:{href:"./call.md"}},[this._v("test")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("ol",[s("li",[this._v("我们发现await基本将异步方式变成了“同步”，那么如何并行异步？")]),this._v(" "),s("li",[this._v("如何才能优雅地catch错误")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("pre",{pre:!0},[e("code",{attrs:{"v-pre":"",class:"language-js"}},[e("span",{attrs:{class:"hljs-comment"}},[t._v("// 通过then的形式将不断嵌套的回调变得平行")]),t._v("\npromiseFn()\n  .then(...)\n  .then(...)\n\n"),e("span",{attrs:{class:"hljs-comment"}},[t._v("// 通过Promise.all解决并行异步问题")]),t._v("\n"),e("span",{attrs:{class:"hljs-built_in"}},[t._v("Promise")]),t._v(".all(...)\n\n"),e("span",{attrs:{class:"hljs-comment"}},[t._v("// 通过catch捕获整个Promise链上的任意错误")]),t._v("\npromiseFn()\n  .then(...)\n  .then(...)\n  ...\n  .catch(...)\n")])])}]},i=e("VU/8")(null,a,!1,null,null,null);s.default=i.exports}});
//# sourceMappingURL=16.3ea8a59c5dfa5815246a.js.map