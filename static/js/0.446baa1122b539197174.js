webpackJsonp([0],{"//Fk":function(s,t,a){s.exports={default:a("U5ju"),__esModule:!0}},"82Mu":function(s,t,a){var n=a("7KvD"),e=a("L42u").set,r=n.MutationObserver||n.WebKitMutationObserver,l=n.process,_=n.Promise,v="process"==a("R9M2")(l);s.exports=function(){var s,t,a,c=function(){var n,e;for(v&&(n=l.domain)&&n.exit();s;){e=s.fn,s=s.next;try{e()}catch(n){throw s?a():t=void 0,n}}t=void 0,n&&n.enter()};if(v)a=function(){l.nextTick(c)};else if(!r||n.navigator&&n.navigator.standalone)if(_&&_.resolve){var o=_.resolve();a=function(){o.then(c)}}else a=function(){e.call(n,c)};else{var i=!0,p=document.createTextNode("");new r(c).observe(p,{characterData:!0}),a=function(){p.data=i=!i}}return function(n){var e={fn:n,next:void 0};t&&(t.next=e),s||(s=e,a()),t=e}}},CXw9:function(s,t,a){"use strict";var n,e,r,l,_=a("O4g8"),v=a("7KvD"),c=a("+ZMJ"),o=a("RY/4"),i=a("kM2E"),p=a("EqjI"),h=a("lOnJ"),m=a("2KxR"),u=a("NWt+"),j=a("t8x9"),f=a("L42u").set,d=a("82Mu")(),g=a("qARP"),b=a("dNDb"),w=a("fJUb"),y=v.TypeError,k=v.process,P=v.Promise,E="process"==o(k),x=function(){},C=e=g.f,$=!!function(){try{var s=P.resolve(1),t=(s.constructor={})[a("dSzd")("species")]=function(s){s(x,x)};return(E||"function"==typeof PromiseRejectionEvent)&&s.then(x)instanceof t}catch(s){}}(),R=function(s){var t;return!(!p(s)||"function"!=typeof(t=s.then))&&t},M=function(s,t){if(!s._n){s._n=!0;var a=s._c;d(function(){for(var n=s._v,e=1==s._s,r=0,l=function(t){var a,r,l=e?t.ok:t.fail,_=t.resolve,v=t.reject,c=t.domain;try{l?(e||(2==s._h&&F(s),s._h=1),!0===l?a=n:(c&&c.enter(),a=l(n),c&&c.exit()),a===t.promise?v(y("Promise-chain cycle")):(r=R(a))?r.call(a,_,v):_(a)):v(n)}catch(s){v(s)}};a.length>r;)l(a[r++]);s._c=[],s._n=!1,t&&!s._h&&T(s)})}},T=function(s){f.call(v,function(){var t,a,n,e=s._v,r=q(s);if(r&&(t=b(function(){E?k.emit("unhandledRejection",e,s):(a=v.onunhandledrejection)?a({promise:s,reason:e}):(n=v.console)&&n.error&&n.error("Unhandled promise rejection",e)}),s._h=E||q(s)?2:1),s._a=void 0,r&&t.e)throw t.v})},q=function(s){return 1!==s._h&&0===(s._a||s._c).length},F=function(s){f.call(v,function(){var t;E?k.emit("rejectionHandled",s):(t=v.onrejectionhandled)&&t({promise:s,reason:s._v})})},D=function(s){var t=this;t._d||(t._d=!0,(t=t._w||t)._v=s,t._s=2,t._a||(t._a=t._c.slice()),M(t,!0))},O=function(s){var t,a=this;if(!a._d){a._d=!0,a=a._w||a;try{if(a===s)throw y("Promise can't be resolved itself");(t=R(s))?d(function(){var n={_w:a,_d:!1};try{t.call(s,c(O,n,1),c(D,n,1))}catch(s){D.call(n,s)}}):(a._v=s,a._s=1,M(a,!1))}catch(s){D.call({_w:a,_d:!1},s)}}};$||(P=function(s){m(this,P,"Promise","_h"),h(s),n.call(this);try{s(c(O,this,1),c(D,this,1))}catch(s){D.call(this,s)}},(n=function(s){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1}).prototype=a("xH/j")(P.prototype,{then:function(s,t){var a=C(j(this,P));return a.ok="function"!=typeof s||s,a.fail="function"==typeof t&&t,a.domain=E?k.domain:void 0,this._c.push(a),this._a&&this._a.push(a),this._s&&M(this,!1),a.promise},catch:function(s){return this.then(void 0,s)}}),r=function(){var s=new n;this.promise=s,this.resolve=c(O,s,1),this.reject=c(D,s,1)},g.f=C=function(s){return s===P||s===l?new r(s):e(s)}),i(i.G+i.W+i.F*!$,{Promise:P}),a("e6n0")(P,"Promise"),a("bRrM")("Promise"),l=a("FeBl").Promise,i(i.S+i.F*!$,"Promise",{reject:function(s){var t=C(this);return(0,t.reject)(s),t.promise}}),i(i.S+i.F*(_||!$),"Promise",{resolve:function(s){return w(_&&this===l?P:this,s)}}),i(i.S+i.F*!($&&a("dY0y")(function(s){P.all(s).catch(x)})),"Promise",{all:function(s){var t=this,a=C(t),n=a.resolve,e=a.reject,r=b(function(){var a=[],r=0,l=1;u(s,!1,function(s){var _=r++,v=!1;a.push(void 0),l++,t.resolve(s).then(function(s){v||(v=!0,a[_]=s,--l||n(a))},e)}),--l||n(a)});return r.e&&e(r.v),a.promise},race:function(s){var t=this,a=C(t),n=a.reject,e=b(function(){u(s,!1,function(s){t.resolve(s).then(a.resolve,n)})});return e.e&&n(e.v),a.promise}})},EqBC:function(s,t,a){"use strict";var n=a("kM2E"),e=a("FeBl"),r=a("7KvD"),l=a("t8x9"),_=a("fJUb");n(n.P+n.R,"Promise",{finally:function(s){var t=l(this,e.Promise||r.Promise),a="function"==typeof s;return this.then(a?function(a){return _(t,s()).then(function(){return a})}:s,a?function(a){return _(t,s()).then(function(){throw a})}:s)}})},L42u:function(s,t,a){var n,e,r,l=a("+ZMJ"),_=a("knuC"),v=a("RPLV"),c=a("ON07"),o=a("7KvD"),i=o.process,p=o.setImmediate,h=o.clearImmediate,m=o.MessageChannel,u=o.Dispatch,j=0,f={},d=function(){var s=+this;if(f.hasOwnProperty(s)){var t=f[s];delete f[s],t()}},g=function(s){d.call(s.data)};p&&h||(p=function(s){for(var t=[],a=1;arguments.length>a;)t.push(arguments[a++]);return f[++j]=function(){_("function"==typeof s?s:Function(s),t)},n(j),j},h=function(s){delete f[s]},"process"==a("R9M2")(i)?n=function(s){i.nextTick(l(d,s,1))}:u&&u.now?n=function(s){u.now(l(d,s,1))}:m?(r=(e=new m).port2,e.port1.onmessage=g,n=l(r.postMessage,r,1)):o.addEventListener&&"function"==typeof postMessage&&!o.importScripts?(n=function(s){o.postMessage(s+"","*")},o.addEventListener("message",g,!1)):n="onreadystatechange"in c("script")?function(s){v.appendChild(c("script")).onreadystatechange=function(){v.removeChild(this),d.call(s)}}:function(s){setTimeout(l(d,s,1),0)}),s.exports={set:p,clear:h}},Py6i:function(s,t,a){s.exports=a.p+"static/img/eventLoop.a5d4c98.jpg"},U5ju:function(s,t,a){a("M6a0"),a("zQR9"),a("+tPU"),a("CXw9"),a("EqBC"),a("jKW+"),s.exports=a("FeBl").Promise},dNDb:function(s,t){s.exports=function(s){try{return{e:!1,v:s()}}catch(s){return{e:!0,v:s}}}},fJUb:function(s,t,a){var n=a("77Pl"),e=a("EqjI"),r=a("qARP");s.exports=function(s,t){if(n(s),e(t)&&t.constructor===s)return t;var a=r.f(s);return(0,a.resolve)(t),a.promise}},"jKW+":function(s,t,a){"use strict";var n=a("kM2E"),e=a("qARP"),r=a("dNDb");n(n.S,"Promise",{try:function(s){var t=e.f(this),a=r(s);return(a.e?t.reject:t.resolve)(a.v),t.promise}})},knuC:function(s,t){s.exports=function(s,t,a){var n=void 0===a;switch(t.length){case 0:return n?s():s.call(a);case 1:return n?s(t[0]):s.call(a,t[0]);case 2:return n?s(t[0],t[1]):s.call(a,t[0],t[1]);case 3:return n?s(t[0],t[1],t[2]):s.call(a,t[0],t[1],t[2]);case 4:return n?s(t[0],t[1],t[2],t[3]):s.call(a,t[0],t[1],t[2],t[3])}return s.apply(a,t)}},qARP:function(s,t,a){"use strict";var n=a("lOnJ");s.exports.f=function(s){return new function(s){var t,a;this.promise=new s(function(s,n){if(void 0!==t||void 0!==a)throw TypeError("Bad Promise constructor");t=s,a=n}),this.resolve=n(t),this.reject=n(a)}(s)}},rd5k:function(s,t,a){s.exports=a("tlxI")},t8x9:function(s,t,a){var n=a("77Pl"),e=a("lOnJ"),r=a("dSzd")("species");s.exports=function(s,t){var a,l=n(s).constructor;return void 0===l||void 0==(a=n(l)[r])?t:e(a)}},tlxI:function(s,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("//Fk"),e=a.n(n),r=document.querySelector(".test");setTimeout(function(){setTimeout(function(){r.style.width="300px",e.a.resolve(performance.now()).then(console.log)},0),setTimeout(function(){r.style.width="200px",console.log(performance.now(),"timer2")},0)},300);var l={render:function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("section",[a("h2",{attrs:{id:"事件循环的一点疑惑"}},[s._v("事件循环的一点疑惑")]),s._v(" "),a("div",{staticClass:"aside-menu"},[a("div",{directives:[{name:"toggle",rawName:"v-toggle"}],staticClass:"aside-menu-tit"},[s._v("menu")]),s._v(" "),s._m(0)]),a("b",{staticClass:"update-time"},[s._v(s._s(s._f("formatTime")(1542638521139)))]),a("b",{staticClass:"type"},[s._v("其他")]),s._v(" "),a("b",{staticClass:"kw"},[s._v("promise")]),s._v(" "),a("b",{staticClass:"kw"},[s._v("事件循环")]),s._v(" "),a("b",{staticClass:"kw"},[s._v("宏队列与微队列")]),s._v(" "),s._m(1),s._v(" "),a("h3",{attrs:{id:"关于 promise 有话说"}},[s._v("关于 promise 有话说")]),s._v(" "),a("p",[s._v("先看题")]),s._v(" "),s._m(2),s._v(" "),a("p",[s._v("咋一看，你的答案可能是这样：")]),s._v(" "),s._m(3),s._v(" "),a("h4",{attrs:{id:"分析"}},[s._v("分析")]),s._v(" "),s._m(4),s._v(" "),s._m(5),s._v(" "),a("p",[s._v("我们现在用两格短线表示 then 的时间，上面是 promise1 下面是 promise2")]),s._v(" "),s._m(6),s._v(" "),s._m(7),s._v(" "),a("p",[s._v("我们尝试加一下 性能测试 performance.now()，图又是什么样子的呢？")]),s._v(" "),s._m(8),s._v(" "),s._m(9),s._v(" "),s._m(10),s._v(" "),s._m(11),s._v(" "),a("h4",{attrs:{id:"总结"}},[s._v("总结")]),s._v(" "),a("p",[s._v("then 方法内部实现看来比我想的简单，却存在坑了，因为原本一次事件循环搞定现在却只能通过三次，启发在于 catch 的使用")]),s._v(" "),s._m(12),s._v(" "),a("p",[s._v("显然是先 catch2")]),s._v(" "),a("h3",{attrs:{id:"关于 macrotask & microtask"}},[s._v("关于 macrotask & microtask")]),s._v(" "),s._m(13),s._v(" "),a("h4",{attrs:{id:"一次事件循环只执行一个 macrotask"}},[s._v("一次事件循环只执行一个 macrotask")]),s._v(" "),a("p",[s._v("看一个例子")]),s._v(" "),s._m(14),s._v(" "),a("p",[s._v("答案是 2 1。或许你这里就算用了 performance 也不能看出端倪，但是我们知道 Promise 是异步就好了")]),s._v(" "),s._m(15),s._v(" "),s._m(16),s._v(" "),s._m(17),s._v(" "),s._m(18),s._v(" "),a("h4",{attrs:{id:"一次事件循环会执行完所有微队列"}},[s._v("一次事件循环会执行完所有微队列")]),s._v(" "),a("p",[s._v("这一部分感觉没什么好说的，但是可以说的是必须清空微队列才会进入新的事件循环，也就是意味着在一个微队列里执行新的微队列会在一次事件循环里")]),s._v(" "),s._m(19)])},staticRenderFns:[function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"aside-menu-con"},[t("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#关于 promise 有话说"}},[this._v("关于 promise 有话说")]),t("a",{staticClass:"level-4 aside-menu-item",attrs:{href:"#分析"}},[this._v("分析")]),t("a",{staticClass:"level-4 aside-menu-item",attrs:{href:"#总结"}},[this._v("总结")]),t("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#关于 macrotask & microtask"}},[this._v("关于 macrotask & microtask")]),t("a",{staticClass:"level-4 aside-menu-item",attrs:{href:"#一次事件循环只执行一个 macrotask"}},[this._v("一次事件循环只执行一个 macrotask")]),t("a",{staticClass:"level-4 aside-menu-item",attrs:{href:"#一次事件循环会执行完所有微队列"}},[this._v("一次事件循环会执行完所有微队列")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("blockquote",[t("p",[this._v("我们知道 js 是单线程执行的，但是借助宿主，可以获得异步的能力，在浏览器中依赖 webAPI，在 node 中依赖 libuv\n但是这还不够。我们还需要区分 宏队列（macrotask）和微队列（microtask）。我们知道是先执行微队列再执行宏队列")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("details",[a("summary",[s._v("js")]),s._v(" "),a("pre",{pre:!0},[a("code",{attrs:{"v-pre":"",class:"language-js"}},[a("span",{attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("Promise")]),s._v("("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("resolve")]),s._v(" =>")]),s._v(" {\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log("),a("span",{attrs:{class:"hljs-string"}},[s._v("'promise1'")]),s._v(")\n  resolve("),a("span",{attrs:{class:"hljs-number"}},[s._v("1")]),s._v(")\n}).then("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("res")]),s._v(" =>")]),s._v(" {\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log("),a("span",{attrs:{class:"hljs-string"}},[s._v("'promise1'")]),s._v(", ++res)\n  performance.now()\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" res\n}).then("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("res")]),s._v(" =>")]),s._v(" {\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log("),a("span",{attrs:{class:"hljs-string"}},[s._v("'promise1'")]),s._v(", ++res)\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("Promise")]),s._v(".resolve(res) "),a("span",{attrs:{class:"hljs-comment"}},[s._v("// 注意这里不一样")]),s._v("\n}).then("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("res")]),s._v(" =>")]),s._v(" {\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log("),a("span",{attrs:{class:"hljs-string"}},[s._v("'promise1'")]),s._v(", ++res)\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" res\n}).then("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("res")]),s._v(" =>")]),s._v(" {\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log("),a("span",{attrs:{class:"hljs-string"}},[s._v("'promise1'")]),s._v(", ++res)\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" res\n}).then("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("res")]),s._v(" =>")]),s._v(" {\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log("),a("span",{attrs:{class:"hljs-string"}},[s._v("'promise1'")]),s._v(", ++res)\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" res\n})\n\n"),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log("),a("span",{attrs:{class:"hljs-string"}},[s._v("'normal'")]),s._v(")\n\n"),a("span",{attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("Promise")]),s._v("("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("resolve")]),s._v(" =>")]),s._v(" {\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log("),a("span",{attrs:{class:"hljs-string"}},[s._v("'promise2'")]),s._v(")\n  resolve("),a("span",{attrs:{class:"hljs-number"}},[s._v("1")]),s._v(")\n}).then("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("res")]),s._v(" =>")]),s._v(" {\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log("),a("span",{attrs:{class:"hljs-string"}},[s._v("'promise2'")]),s._v(", ++res)\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" res\n}).then("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("res")]),s._v(" =>")]),s._v(" {\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log("),a("span",{attrs:{class:"hljs-string"}},[s._v("'promise2'")]),s._v(", ++res)\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" res\n}).then("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("res")]),s._v(" =>")]),s._v(" {\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log("),a("span",{attrs:{class:"hljs-string"}},[s._v("'promise2'")]),s._v(", ++res)\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" res\n}).then("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("res")]),s._v(" =>")]),s._v(" {\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log("),a("span",{attrs:{class:"hljs-string"}},[s._v("'promise2'")]),s._v(", ++res)\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" res\n}).then("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("res")]),s._v(" =>")]),s._v(" {\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log("),a("span",{attrs:{class:"hljs-string"}},[s._v("'promise2'")]),s._v(", ++res)\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" res\n})\n")])])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0},[a("code",{attrs:{"v-pre":"",class:"language-js"}},[a("span",{attrs:{class:"hljs-comment"}},[s._v("// 一开始以为的：    实际是这样：")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("// promise1        嗯，你是对的")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("// normal          嗯，你是对的")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("// promise2        嗯，你是对的")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("// promise1 2      嗯，你是对的")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("// promise2 2      嗯，你是对的")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("// promise1 3      嗯，你是对的")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("// promise2 3      嗯，你是对的")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("// promise2 4      嗯，你是对的")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("// promise1 4      promise2 5")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("// promise2 5      promise1 4")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("// promise1 5      promise2 6")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("// promise2 6      promise1 5")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("// promise1 6      嗯，你是对的")]),s._v("\n")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("p",[this._v("如果知道事件循环，前面到 "),t("code",{pre:!0},[this._v("Promise.resolve(res)")]),this._v(" 没什么可说的。关键是后面发生了什么？为什么慢两个拍？")])},function(){var s=this.$createElement,t=this._self._c||s;return t("blockquote",[t("p",[this._v("我们知道 promise 在 resolver 和 rejecter 可以返回 promise，并且这个 promise 的返回将传递给后续的 resolver 或 rejecter\n而 promise 本身在 then cache 也会返回一个 promise，这也是为什么可以被链式调用，而其状态取决于当前 状态，这也是为什么有值的穿透这个现象了\n但是")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("pre",{pre:!0},[t("code",{attrs:{"v-pre":"",class:"language-sh"}},[this._v("2  3     4  5  6\n|__|__ __|__|__|\n\n2  3  4  5  6\n|__|__|__|__|\n")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("p",[s._v("现在大概知道不是 "),a("code",{pre:!0},[s._v("promise2 4 => promise1 4 => promise2 5 => promise1 5 => promise2 6 => promise1 6")]),s._v(" 了"),a("br"),s._v("\n但是为什么是 "),a("code",{pre:!0},[s._v("promise2 4 => promise2 5 => promise1 4 => promise2 6 => promise2 5 => promise1 6")]),s._v(" ?"),a("br"),s._v("\n问题在于 "),a("code",{pre:!0},[s._v("promise2 5")]),s._v(" 在 "),a("code",{pre:!0},[s._v("promise1 4")]),s._v(" 之前执行？")])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0},[a("code",{attrs:{"v-pre":"",class:"language-sh"}},[a("span",{attrs:{class:"hljs-comment"}},[s._v("# promise1 2 1716.5999999997439")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("# promise2 2 1717.3000000038883")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("# promise1 3 1717.800000013085")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("# promise2 3 1718.1000000127824")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("# promise2 4 1718.5000000026776")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("# promise2 5 1718.9000000071246")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("# promise1 4 1719.200000006822")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("# promise2 6 1719.600000011269")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("# promise1 5 1720.0000000011642")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("# promise1 6 1720.3000000008615")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("# 很不幸，经过多次测试我们发现 promise1 4 一直介于 promise2 5、6之间，这个就回到事件循环本质上了，每一个 then 都是在微队列的一个切片上，不会重合，所以上面的图如下：")]),s._v("\n2  3        4  5  6\n|__|_____ __|__|__|\n\n 2  3  4  5  6\n |__|__|__|__|\n")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("blockquote",[t("p",[this._v("看到这里我好像明白了，看来 promise 垫片需要重写了，因为返回 Promise 并不是让其代替默认返回的 Promise 而是照常返回，只是 value 是 Promise 实例\n显然事件循环是在 resolve reject 内部实现")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("details",[a("summary",[s._v("js")]),s._v(" "),a("pre",{pre:!0},[a("code",{attrs:{"v-pre":"",class:"language-js"}},[a("span",{attrs:{class:"hljs-built_in"}},[s._v("Promise")]),s._v(".resolve = "),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),a("span",{attrs:{class:"hljs-params"}},[s._v("result")]),s._v(") ")]),s._v("{\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("Promise")]),s._v("("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("resolve")]),s._v(" =>")]),s._v(" {\n    "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" (result && result.constructor === "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("Promise")]),s._v(") {\n      result.then(resolve)\n    } "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("else")]),s._v(" {\n      resolve(result)\n    }\n  })\n}\n\n"),a("span",{attrs:{class:"hljs-built_in"}},[s._v("Promise")]),s._v(".prototype.then = "),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),a("span",{attrs:{class:"hljs-params"}},[s._v("fn, fn2")]),s._v(") ")]),s._v("{\n  "),a("span",{attrs:{class:"hljs-comment"}},[s._v("// 省略状态判断")]),s._v("\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("Promise")]),s._v(".resolve(fn("),a("span",{attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".data))\n}\n\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("// 可能还是懵的，那我们再来看 返回 Promise.resolve(res)即 result就是 Promise.resolve(res)")]),s._v("\n"),a("span",{attrs:{class:"hljs-built_in"}},[s._v("Promise")]),s._v(".resolve = "),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),a("span",{attrs:{class:"hljs-params"}},[s._v("result")]),s._v(") ")]),s._v("{\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("Promise")]),s._v("("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("resolve")]),s._v(" =>")]),s._v(" {\n    "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" (result && result.constructor === "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("Promise")]),s._v(") {\n      "),a("span",{attrs:{class:"hljs-comment"}},[s._v("// Promise.resolve(res).then(resolve)")]),s._v("\n      "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" pro = "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("Promise")]),s._v(".resolve(res) "),a("span",{attrs:{class:"hljs-comment"}},[s._v("// Promise.resolve 内部调用一次 resolve")]),s._v("\n      pro.then(fn) "),a("span",{attrs:{class:"hljs-comment"}},[s._v("// then 内部调用 Promise.resolve, Promise.resolve 调用 resolve 两次了")]),s._v("\n      "),a("span",{attrs:{class:"hljs-comment"}},[s._v("// 这里 fn 就是 resolve 一共三次，所以间隔了三次事件循环")]),s._v("\n    } "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("else")]),s._v(" {\n      resolve(result)\n    }\n  })\n}\n")])])])},function(){var s=this.$createElement,t=this._self._c||s;return t("p",[this._v("现在终于能解释为什么 "),t("code",{pre:!0},[this._v("return Promise.resolve(res)")]),this._v(" 间隔了三次事件循环了")])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0},[a("code",{attrs:{"v-pre":"",class:"language-js"}},[a("span",{attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("Promise")]),s._v("("),a("span",{attrs:{class:"hljs-function"}},[s._v("("),a("span",{attrs:{class:"hljs-params"}},[s._v("resolve, reject")]),s._v(") =>")]),s._v(" {\n  reject("),a("span",{attrs:{class:"hljs-number"}},[s._v("1")]),s._v(")\n}).then("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("res")]),s._v(" =>")]),s._v(" "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log(res, "),a("span",{attrs:{class:"hljs-string"}},[s._v("'promise1Resolved'")]),s._v("))\n.catch("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("err")]),s._v(" =>")]),s._v(" "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log(err, "),a("span",{attrs:{class:"hljs-string"}},[s._v("'promise1Rejected'")]),s._v("))\n\n"),a("span",{attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("Promise")]),s._v("("),a("span",{attrs:{class:"hljs-function"}},[s._v("("),a("span",{attrs:{class:"hljs-params"}},[s._v("resolve, reject")]),s._v(") =>")]),s._v(" {\n  reject("),a("span",{attrs:{class:"hljs-number"}},[s._v("1")]),s._v(")\n}).then("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("res")]),s._v(" =>")]),s._v(" "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log(res, "),a("span",{attrs:{class:"hljs-string"}},[s._v("'promise2Resolved'")]),s._v("), err => "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log(err, "),a("span",{attrs:{class:"hljs-string"}},[s._v("'promise2Rejected'")]),s._v("))\n")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("p",[this._v("先祭出一张图吧"),t("br"),this._v(" "),t("img",{attrs:{src:a("Py6i"),width:"500px"}})])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0},[a("code",{attrs:{"v-pre":"",class:"language-js"}},[s._v("setTimeout("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("()")]),s._v(" =>")]),s._v(" {\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("Promise")]),s._v(".resolve("),a("span",{attrs:{class:"hljs-number"}},[s._v("2")]),s._v(")\n    .then("),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log)\n}, "),a("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v(")\n\nsetTimeout("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("()")]),s._v(" =>")]),s._v(" {\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log("),a("span",{attrs:{class:"hljs-number"}},[s._v("1")]),s._v(")\n}, "),a("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v(")\n")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0},[a("code",{attrs:{"v-pre":"",class:"language-html"}},[a("span",{attrs:{class:"hljs-meta"}},[s._v("<!DOCTYPE html>")]),s._v("\n"),a("span",{attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{attrs:{class:"hljs-name"}},[s._v("html")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("lang")]),s._v("="),a("span",{attrs:{class:"hljs-string"}},[s._v('"en"')]),s._v(">")]),s._v("\n"),a("span",{attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{attrs:{class:"hljs-name"}},[s._v("head")]),s._v(">")]),s._v("\n  "),a("span",{attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{attrs:{class:"hljs-name"}},[s._v("title")]),s._v(">")]),s._v("test macrotask"),a("span",{attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{attrs:{class:"hljs-name"}},[s._v("title")]),s._v(">")]),s._v("\n"),a("span",{attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{attrs:{class:"hljs-name"}},[s._v("head")]),s._v(">")]),s._v("\n"),a("span",{attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{attrs:{class:"hljs-name"}},[s._v("body")]),s._v(">")]),s._v("\n    "),a("span",{attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{attrs:{class:"hljs-name"}},[s._v("div")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("class")]),s._v("="),a("span",{attrs:{class:"hljs-string"}},[s._v('"test"')]),s._v(">")]),s._v("123"),a("span",{attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{attrs:{class:"hljs-name"}},[s._v("div")]),s._v(">")]),s._v("\n    "),a("span",{attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{attrs:{class:"hljs-name"}},[s._v("script")]),s._v(">")]),a("span",{attrs:{class:"javascript"}},[s._v("\n      "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" test = "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("document")]),s._v(".querySelector("),a("span",{attrs:{class:"hljs-string"}},[s._v("'.test'")]),s._v(")\n      setTimeout("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("()")]),s._v(" =>")]),s._v(" {\n        setTimeout("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("()")]),s._v(" =>")]),s._v(" {\n          test.style.width = "),a("span",{attrs:{class:"hljs-string"}},[s._v("'300px'")]),s._v("\n          "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("Promise")]),s._v(".resolve(performance.now())\n            .then("),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log)\n        }, "),a("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v(")\n        setTimeout("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("()")]),s._v(" =>")]),s._v(" {\n          test.style.width = "),a("span",{attrs:{class:"hljs-string"}},[s._v("'200px'")]),s._v(" "),a("span",{attrs:{class:"hljs-comment"}},[s._v("// 需要重排才行，如果一个引发重绘一个引发重排也不会 render")]),s._v("\n          "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log(performance.now(), "),a("span",{attrs:{class:"hljs-string"}},[s._v("'timer2'")]),s._v(")\n        }, "),a("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v(")\n      }, "),a("span",{attrs:{class:"hljs-number"}},[s._v("300")]),s._v(") "),a("span",{attrs:{class:"hljs-comment"}},[s._v("// 需要 firstRender 完成")]),s._v("\n    ")]),a("span",{attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{attrs:{class:"hljs-name"}},[s._v("script")]),s._v(">")]),s._v("\n"),a("span",{attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{attrs:{class:"hljs-name"}},[s._v("body")]),s._v(">")]),s._v("\n"),a("span",{attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{attrs:{class:"hljs-name"}},[s._v("html")]),s._v(">")]),s._v("\n")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("p",[this._v("好吧，我承认为了把它们分到两次事件循环花了很长时间（更新了 Chrome 就不行了。。。。），因为浏览器实在太聪明了！！！"),t("br"),this._v("\n首先完整的事件循环并不是 run 一个 macrotask 后立马 render 而是 判断是否需要重现渲染。这个完全就是看浏览器心情了。。。。"),t("br"),this._v("\n根据上面的例子我们得到的结论就是 "),t("strong",[this._v("每次事件循环只执行一个 macrotask")]),this._v(" ，但是问题来了")])},function(){var s=this.$createElement,t=this._self._c||s;return t("ol",[t("li",[this._v("如果把前一个 time 改为 1 会先执行哪个？")]),this._v(" "),t("li",[this._v("我们在写动画时用 setTimeout 0 会发生什么？")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("p",[this._v("第一个问题的答案是不确定，完全看心情，笔者使用 chrmoe 基本是间隔 2 毫秒才会先执行第二个，但至少可以确定的是 不一定 根据 time（间隔比较小） 参数来决定 installTimer 顺序"),t("br"),this._v("\n第二个问题 浏览器真的很聪明，我使用的 chrome 开始一般 合并 3-4 帧，然后 合并 10 多帧，最后基本是 7-8 帧，才渲染一次（不管是是否引发重排）")])},function(){var s=this.$createElement,t=this._self._c||s;return t("p",[t("b",{staticClass:"show-blog"},[this._v("true")])])}]},_=a("VU/8")(void 0,l,!1,null,null,null);t.default=_.exports}});
//# sourceMappingURL=0.446baa1122b539197174.js.map