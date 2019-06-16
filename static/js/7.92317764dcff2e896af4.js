webpackJsonp([7],{jjpO:function(s,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={render:function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("section",[a("p",[s._v("<<<<<<< HEAD")]),s._v(" "),a("h2",{attrs:{id:"吹毛求疵的 js 性能"}},[s._v("吹毛求疵的 js 性能")]),s._v(" "),a("div",{staticClass:"aside-menu"},[a("div",{directives:[{name:"toggle",rawName:"v-toggle"}],staticClass:"aside-menu-tit"},[s._v("menu")]),s._v(" "),s._m(0)]),a("b",{staticClass:"update-time"},[s._v(s._s(s._f("formatTime")(1551503599649)))]),a("b",{staticClass:"type"},[s._v("js")]),s._v(" "),a("b",{staticClass:"kw"},[s._v("js 性能")]),s._v(" "),a("b",{staticClass:"kw"},[s._v("数组、Set、对象、Map")]),s._v(" "),s._m(1),s._v(" "),a("h2",{attrs:{id:"数组 vs Set"}},[s._v("数组 vs Set")]),s._v(" "),s._m(2),s._v(" "),a("h3",{attrs:{id:"单纯循环 vs push or add"}},[s._v("单纯循环 vs push or add")]),s._v(" "),s._m(3),s._v(" "),a("h3",{attrs:{id:"数组查找"}},[s._v("数组查找")]),s._v(" "),s._m(4),s._v(" "),a("h3",{attrs:{id:"数组查找 vs Set 查找"}},[s._v("数组查找 vs Set 查找")]),s._v(" "),a("h3",{attrs:{id:"数组删除 vs Set 删除"}},[s._v("数组删除 vs Set 删除")]),s._v(" "),a("h3",{attrs:{id:"数组修改 vs Set 修改"}},[s._v("数组修改 vs Set 修改")]),s._v(" "),a("h2",{attrs:{id:"对象"}},[s._v("对象")]),s._v(" "),a("h3",{attrs:{id:"对象遍历"}},[s._v("对象遍历")]),s._v(" "),a("h3",{attrs:{id:"数组 vs 对象"}},[s._v("数组 vs 对象")]),s._v(" "),a("h3",{attrs:{id:"数组遍历 vs 对象遍历"}},[s._v("数组遍历 vs 对象遍历")]),s._v(" "),a("h3",{attrs:{id:"数组添加 vs 对象添加成员"}},[s._v("数组添加 vs 对象添加成员")]),s._v(" "),a("h3",{attrs:{id:"数组查找 vs 对象查找"}},[s._v("数组查找 vs 对象查找")]),s._v(" "),a("h3",{attrs:{id:"数组删除 vs 对象删除"}},[s._v("数组删除 vs 对象删除")]),s._v(" "),a("h3",{attrs:{id:"数组修改 vs 对象修改"}},[s._v("数组修改 vs 对象修改")]),s._v(" "),a("h2",{attrs:{id:"对象 vs Map"}},[s._v("对象 vs Map")]),s._v(" "),a("h3",{attrs:{id:"对象新增成员 vs Map新增成员"}},[s._v("对象新增成员 vs Map新增成员")]),s._v(" "),a("h3",{attrs:{id:"对象删除成员 vs Map删除成员"}},[s._v("对象删除成员 vs Map删除成员")]),s._v(" "),a("h3",{attrs:{id:"对象查找成员 vs Map查找成员"}},[s._v("对象查找成员 vs Map查找成员")]),s._v(" "),a("h3",{attrs:{id:"对象修改成员 vs Map修改成员"}},[s._v("对象修改成员 vs Map修改成员")]),s._v(" "),a("h2",{attrs:{id:"结论"}},[s._v("结论")]),s._v(" "),s._m(5),s._v(" "),a("p",[s._v("使用对象、没有原型的对象、map")]),s._v(" "),s._m(6),s._v(" "),a("h2",{attrs:{id:"对象遍历-2"}},[s._v("对象遍历")]),s._v(" "),a("h2",{attrs:{id:"频繁新增、循环、访问、删除成员"}},[s._v("频繁新增、循环、访问、删除成员")]),s._v(" "),s._m(7),s._v(" "),a("p",[s._v("=======")]),s._v(" "),s._m(8),s._v(" "),a("p",[s._v("console.time('forObj');\nconst members = Object.keys(obj);\nfor (let i = 0, l = members.length; i < l; i++) {\nif (obj[members[i]]) {}\n}\nconsole.timeEnd('forObj');")]),s._v(" "),a("p",[s._v("// Promise.resolve().then(() => {\n//   console.time('getObj');\n//   for (let i = 0, l = gets.length; i < l; i++) {\n//     if (obj[keys[gets[i]]]) {}\n//   }\n//   console.timeEnd('getObj');\n// }).then(() => {\n//   console.time('delObj');\n//   for (let i = 0, l = dels.length; i < l; i++) {\n//     delete obj[keys[dels[i]]]\n//   }\n//   console.timeEnd('delObj');\n// })\n}")]),s._v(" "),a("p",[s._v("function case2() {\nconsole.time('addToMap');\nfor (let i = 0, l = keys.length; i < l; i++) {\nmap.set(keys[i], values[i]);\n}\nconsole.timeEnd('addToMap');")]),s._v(" "),a("p",[s._v("console.time('forMap');\nconst members = map.keys();\nfor (let key of members) {\nif (map.get(key)) {}\n}\nconsole.timeEnd('forMap');")]),s._v(" "),a("p",[s._v("// Promise.resolve().then(() => {\n//   console.time('getMap');\n//   for (let i = 0, l = gets.length; i < l; i++) {\n//     if (map.get(keys[gets[i]])) {}\n//   }\n//   console.timeEnd('getMap');\n// }).then(() => {\n//   console.time('delMap');\n//   for (let i = 0, l = dels.length; i < l; i++) {\n//     map.delete(keys[dels[i]]);\n//   }\n//   console.timeEnd('delMap');\n// })\n}")]),s._v(" "),a("p",[s._v("function case3() {\nconsole.time('addToNullObj');\nfor (let i = 0, l = keys.length; i < l; i++) {\nnullObj[keys[i]] = values[i];\n}\nconsole.timeEnd('addToNullObj');")]),s._v(" "),a("p",[s._v("Promise.resolve().then(() => {\nconsole.time('getNullObj');\nfor (let i = 0, l = gets.length; i < l; i++) {\nif (nullObj[keys[gets[i]]]) {}\n}\nconsole.timeEnd('getNullObj');\n}).then(() => {\nconsole.time('delNullObj');\nfor (let i = 0, l = dels.length; i < l; i++) {\ndelete nullObj[keys[dels[i]]]\n}\nconsole.timeEnd('delNullObj');\n})\n}")]),s._v(" "),a("p",[s._v("switch (CASE) {\ncase 1:\ncase1();\nbreak;\ncase 2:\ncase2();\nbreak;\ncase 3:\ncase3();\nbreak;\n}")]),s._v(" "),s._m(9)])},staticRenderFns:[function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"aside-menu-con"},[a("a",{staticClass:"level-2 aside-menu-item",attrs:{href:"#吹毛求疵的 js 性能"}},[s._v("吹毛求疵的 js 性能")]),a("a",{staticClass:"level-2 aside-menu-item",attrs:{href:"#数组 vs Set"}},[s._v("数组 vs Set")]),a("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#单纯循环 vs push or add"}},[s._v("单纯循环 vs push or add")]),a("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#数组查找"}},[s._v("数组查找")]),a("a",{staticClass:"level-1 aside-menu-item",attrs:{href:"#js 底层性能小探"}},[s._v("js 底层性能小探")]),a("a",{staticClass:"level-2 aside-menu-item",attrs:{href:"#数组遍历"}},[s._v("数组遍历")]),a("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#查找数组某个成员"}},[s._v("查找数组某个成员")]),a("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#数组查找 vs Set 查找"}},[s._v("数组查找 vs Set 查找")]),a("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#数组删除 vs Set 删除"}},[s._v("数组删除 vs Set 删除")]),a("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#数组修改 vs Set 修改"}},[s._v("数组修改 vs Set 修改")]),a("a",{staticClass:"level-2 aside-menu-item",attrs:{href:"#对象"}},[s._v("对象")]),a("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#对象遍历"}},[s._v("对象遍历")]),a("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#数组 vs 对象"}},[s._v("数组 vs 对象")]),a("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#数组遍历 vs 对象遍历"}},[s._v("数组遍历 vs 对象遍历")]),a("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#数组添加 vs 对象添加成员"}},[s._v("数组添加 vs 对象添加成员")]),a("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#数组查找 vs 对象查找"}},[s._v("数组查找 vs 对象查找")]),a("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#数组删除 vs 对象删除"}},[s._v("数组删除 vs 对象删除")]),a("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#数组修改 vs 对象修改"}},[s._v("数组修改 vs 对象修改")]),a("a",{staticClass:"level-2 aside-menu-item",attrs:{href:"#对象 vs Map"}},[s._v("对象 vs Map")]),a("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#对象新增成员 vs Map新增成员"}},[s._v("对象新增成员 vs Map新增成员")]),a("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#对象删除成员 vs Map删除成员"}},[s._v("对象删除成员 vs Map删除成员")]),a("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#对象查找成员 vs Map查找成员"}},[s._v("对象查找成员 vs Map查找成员")]),a("a",{staticClass:"level-3 aside-menu-item",attrs:{href:"#对象修改成员 vs Map修改成员"}},[s._v("对象修改成员 vs Map修改成员")]),a("a",{staticClass:"level-2 aside-menu-item",attrs:{href:"#结论"}},[s._v("结论")]),a("a",{staticClass:"level-2 aside-menu-item",attrs:{href:"#对象遍历"}},[s._v("对象遍历")]),a("a",{staticClass:"level-2 aside-menu-item",attrs:{href:"#频繁新增、循环、访问、删除成员"}},[s._v("频繁新增、循环、访问、删除成员")]),a("a",{staticClass:"level-2 aside-menu-item",attrs:{href:"#是否必要缓存？"}},[s._v("是否必要缓存？")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("blockquote",[t("p",[this._v("测试环境 MBP 17款 16G； Chrome 71")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("blockquote",[t("p",[this._v("数组有很多有点，比如遍历，添加删除操作，等等。但是 es6 出现了 Set，两者在很多方面很像")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0},[a("code",{attrs:{"v-pre":"",class:"language-js"}},[a("span",{attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" CASE = "),a("span",{attrs:{class:"hljs-number"}},[s._v("1")]),s._v(";\n"),a("span",{attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" Len = "),a("span",{attrs:{class:"hljs-number"}},[s._v("1000000")]),s._v(";\n"),a("span",{attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" arr = [];\n"),a("span",{attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" set = "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("Set")]),s._v("();\n\n"),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".time("),a("span",{attrs:{class:"hljs-string"}},[s._v("'for'")]),s._v(");\n"),a("span",{attrs:{class:"hljs-keyword"}},[s._v("for")]),s._v(" ("),a("span",{attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" i = "),a("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v("; i < Len; i++) {}\n"),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".timeEnd("),a("span",{attrs:{class:"hljs-string"}},[s._v("'for'")]),s._v(");\n\n"),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),a("span",{attrs:{class:"hljs-title"}},[s._v("case1")]),s._v("("),a("span",{attrs:{class:"hljs-params"}}),s._v(") ")]),s._v("{\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".time("),a("span",{attrs:{class:"hljs-string"}},[s._v("'push'")]),s._v(");\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("for")]),s._v(" ("),a("span",{attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" i = "),a("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v("; i < Len; i++) {\n    arr.push("),a("span",{attrs:{class:"hljs-string"}},[s._v("`item"),a("span",{attrs:{class:"hljs-subst"}},[s._v("${i}")]),s._v("`")]),s._v(");\n  }\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".timeEnd("),a("span",{attrs:{class:"hljs-string"}},[s._v("'push'")]),s._v(");\n}\n\n"),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),a("span",{attrs:{class:"hljs-title"}},[s._v("case2")]),s._v("("),a("span",{attrs:{class:"hljs-params"}}),s._v(") ")]),s._v("{\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".time("),a("span",{attrs:{class:"hljs-string"}},[s._v("'push'")]),s._v(");\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("for")]),s._v(" ("),a("span",{attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" i = "),a("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v("; i < Len; i++) {\n    set.add("),a("span",{attrs:{class:"hljs-string"}},[s._v("`item"),a("span",{attrs:{class:"hljs-subst"}},[s._v("${i}")]),s._v("`")]),s._v(");\n  }\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".timeEnd("),a("span",{attrs:{class:"hljs-string"}},[s._v("'push'")]),s._v(");\n}\n"),a("span",{attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" executors = [case1, case2];\nexecutors[CASE - "),a("span",{attrs:{class:"hljs-number"}},[s._v("1")]),s._v("]();\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("// for 2-3ms")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("// push 400-500ms 42353720")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("// add 800-900ms 52891672")]),s._v("\n")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0},[a("code",{attrs:{"v-pre":"",class:"language-js"}},[a("span",{attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" CASE = "),a("span",{attrs:{class:"hljs-number"}},[s._v("1")]),s._v(";\n"),a("span",{attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" Ind = "),a("span",{attrs:{class:"hljs-number"}},[s._v("5000")]),s._v("; "),a("span",{attrs:{class:"hljs-comment"}},[s._v("// 500 5000 50000 125000 350300 505000 700000 800000")]),s._v("\n"),a("span",{attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" Len = "),a("span",{attrs:{class:"hljs-number"}},[s._v("1000000")]),s._v(";\n"),a("span",{attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" arr = [];\n"),a("span",{attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" target = "),a("span",{attrs:{class:"hljs-string"}},[s._v("`item_"),a("span",{attrs:{class:"hljs-subst"}},[s._v("${Ind}")]),s._v("`")]),s._v("\n"),a("span",{attrs:{class:"hljs-keyword"}},[s._v("for")]),s._v(" ("),a("span",{attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" i = "),a("span",{attrs:{class:"hljs-number"}},[s._v("0")]),s._v("; i < Len; i++) {\n  arr.push("),a("span",{attrs:{class:"hljs-string"}},[s._v("`item_"),a("span",{attrs:{class:"hljs-subst"}},[s._v("${i}")]),s._v("`")]),s._v(")\n=======\n# js 底层性能小探\n\n> js 作为一门动态类型语言，在内存分配管理有着特殊的机制。包括其模拟类的实现依赖原型，在一些细节上处理不同，性能也是完全不同的\n\n## 数组遍历\n\n### 查找数组某个成员\n\n> "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("for")]),s._v(" find findIndex indexOf\n\n"),a("span",{attrs:{class:"hljs-string"}},[s._v("``")]),a("span",{attrs:{class:"hljs-string"}},[s._v("`js\nconst CASE = 1;\nconst ind = 10010;\nconst Len = 1000000;\nconst Arr = [];\nconst findValue = `")]),s._v("value_${ind}"),a("span",{attrs:{class:"hljs-string"}},[s._v("`;\nfor (let i = 0; i < Len; i++) {\n  Arr.push(`")]),s._v("value_${i}"),a("span",{attrs:{class:"hljs-string"}},[s._v("`);\n>>>>>>> fix: 404\n}\n\nfunction case1() {\n  console.time('for');\n<<<<<<< HEAD\n  for (let i = 0, l = arr.length; i < l; i++) {\n    if (arr[i] === target) break;\n=======\n  for (let i = 0, l = Arr.length; i < l; i++) {\n    if (Arr[i] === findValue) break;\n>>>>>>> fix: 404\n  }\n  console.timeEnd('for');\n}\n\nfunction case2() {\n  console.time('find');\n<<<<<<< HEAD\n  arr.find(item => item === target);\n  console.timeEnd('find');\n}\n\nfunction case3() {\n  console.time('findIndex');\n  const ind = arr.findIndex(item => item === target);\n  if (arr[ind]) {}\n  console.timeEnd('findIndex');\n}\n\nfunction case3() {\n  console.time('indexOf');\n  const ind = arr.indexOf(target);\n  if (arr[ind]) {}\n  console.timeEnd('indexOf');\n}\n\nconst executors = [case1, case2, case3];\nexecutors[CASE - 1]();\n// 500\n// for\n  // find\n  // findIndex\n  // indexOf\n//5000\n  // find\n  // findIndex\n  // indexOf\n// 50000\n  // find\n  // findIndex\n  // indexOf\n// 125000\n  // find\n  // findIndex\n  // indexOf\n// 350300\n  // find\n  // findIndex\n  // indexOf\n// 505000\n  // find\n  // findIndex\n  // indexOf\n// 700000\n  // find\n  // findIndex\n  // indexOf\n// 800000\n  // find\n  // findIndex\n  // indexOf\n")])])])},function(){var s=this.$createElement,t=this._self._c||s;return t("blockquote",[t("p",[this._v("很多场景下，我们为一些对象建立一定联系又不需要互相存储，因此经常会创建一些索引，那么这些索引需要频繁访问、新增、删除")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0},[a("code",{attrs:{"v-pre":"",class:"language-js"}},[s._v("=======\n  Arr.find("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("i")]),s._v(" =>")]),s._v(" i === findValue)\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".timeEnd("),a("span",{attrs:{class:"hljs-string"}},[s._v("'find'")]),s._v(");\n}\n"),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),a("span",{attrs:{class:"hljs-title"}},[s._v("case3")]),s._v("("),a("span",{attrs:{class:"hljs-params"}}),s._v(") ")]),s._v("{\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".time("),a("span",{attrs:{class:"hljs-string"}},[s._v("'findIndex'")]),s._v(");\n  Arr.findIndex("),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-params"}},[s._v("i")]),s._v(" =>")]),s._v(" i === findValue)\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".timeEnd("),a("span",{attrs:{class:"hljs-string"}},[s._v("'findIndex'")]),s._v(");\n}\n\n"),a("span",{attrs:{class:"hljs-function"}},[a("span",{attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),a("span",{attrs:{class:"hljs-title"}},[s._v("case4")]),s._v("("),a("span",{attrs:{class:"hljs-params"}}),s._v(") ")]),s._v("{\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".time("),a("span",{attrs:{class:"hljs-string"}},[s._v("'indexOf'")]),s._v(");\n  Arr.indexOf(findValue);\n  "),a("span",{attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".timeEnd("),a("span",{attrs:{class:"hljs-string"}},[s._v("'indexOf'")]),s._v(");\n}\n\n"),a("span",{attrs:{class:"hljs-keyword"}},[s._v("switch")]),s._v(" (CASE) {\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("case")]),s._v(" "),a("span",{attrs:{class:"hljs-number"}},[s._v("1")]),s._v(":\n    case1();\n    "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("break")]),s._v(";\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("case")]),s._v(" "),a("span",{attrs:{class:"hljs-number"}},[s._v("2")]),s._v(":\n    case2();\n    "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("break")]),s._v(";\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("case")]),s._v(" "),a("span",{attrs:{class:"hljs-number"}},[s._v("3")]),s._v(":\n    case3();\n    "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("break")]),s._v(";\n  "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("case")]),s._v(" "),a("span",{attrs:{class:"hljs-number"}},[s._v("4")]),s._v(":\n    case4();\n    "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("break")]),s._v(";\n}\n")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0},[a("code",{attrs:{"v-pre":"",class:"language-js"}},[a("span",{attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" CASE = "),a("span",{attrs:{class:"hljs-number"}},[s._v("2")]),s._v(";\n"),a("span",{attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" Len = "),a("span",{attrs:{class:"hljs-number"}},[s._v("1000000")]),s._v(";\n>>>>>>> fix: "),a("span",{attrs:{class:"hljs-number"}},[s._v("404")]),s._v("\n"),a("span",{attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" keys = [];\n"),a("span",{attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" values = [];\n"),a("span",{attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" gets = [];\n"),a("span",{attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" dels = [];\n"),a("span",{attrs:{class:"xml"}},[a("span",{attrs:{class:"hljs-tag"}},[s._v("<<<<<<< "),a("span",{attrs:{class:"hljs-attr"}},[s._v("HEAD")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("for")]),s._v(" ("),a("span",{attrs:{class:"hljs-attr"}},[s._v("let")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(" = "),a("span",{attrs:{class:"hljs-string"}},[s._v("0;")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(" < "),a("span",{attrs:{class:"hljs-attr"}},[s._v("1000000")]),s._v("; "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v("++) {\n  "),a("span",{attrs:{class:"hljs-attr"}},[s._v("keys.push")]),s._v("(`"),a("span",{attrs:{class:"hljs-attr"}},[s._v("key_")]),s._v("${"),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v("}`);\n  "),a("span",{attrs:{class:"hljs-attr"}},[s._v("values.push")]),s._v("(`"),a("span",{attrs:{class:"hljs-attr"}},[s._v("value_")]),s._v("${"),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v("}`);\n  "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(" % "),a("span",{attrs:{class:"hljs-attr"}},[s._v("3")]),s._v(" === "),a("span",{attrs:{class:"hljs-string"}},[s._v("0")]),s._v(" && "),a("span",{attrs:{class:"hljs-attr"}},[s._v("gets.push")]),s._v("("),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(");\n  "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(" % "),a("span",{attrs:{class:"hljs-attr"}},[s._v("3")]),s._v(" === "),a("span",{attrs:{class:"hljs-string"}},[s._v("1")]),s._v(" && "),a("span",{attrs:{class:"hljs-attr"}},[s._v("dels.push")]),s._v("("),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(")\n}\n\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("console.time")]),s._v("('"),a("span",{attrs:{class:"hljs-attr"}},[s._v("addToObj")]),s._v("');\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("const")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("obj")]),s._v(" = "),a("span",{attrs:{class:"hljs-string"}},[s._v("{};")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("for")]),s._v(" ("),a("span",{attrs:{class:"hljs-attr"}},[s._v("let")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(" = "),a("span",{attrs:{class:"hljs-string"}},[s._v("0,")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("l")]),s._v(" = "),a("span",{attrs:{class:"hljs-string"}},[s._v("keys.length;")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(" < "),a("span",{attrs:{class:"hljs-attr"}},[s._v("l")]),s._v("; "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v("++) {\n  "),a("span",{attrs:{class:"hljs-attr"}},[s._v("obj")]),s._v("["),a("span",{attrs:{class:"hljs-attr"}},[s._v("keys")]),s._v("["),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v("]] = "),a("span",{attrs:{class:"hljs-string"}},[s._v("values[i];")]),s._v("\n}\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("console.timeEnd")]),s._v("('"),a("span",{attrs:{class:"hljs-attr"}},[s._v("addToObj")]),s._v("');\n\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("console.time")]),s._v("('"),a("span",{attrs:{class:"hljs-attr"}},[s._v("getObj")]),s._v("');\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("for")]),s._v(" ("),a("span",{attrs:{class:"hljs-attr"}},[s._v("let")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(" = "),a("span",{attrs:{class:"hljs-string"}},[s._v("0,")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("l")]),s._v(" = "),a("span",{attrs:{class:"hljs-string"}},[s._v("gets.length;")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(" < "),a("span",{attrs:{class:"hljs-attr"}},[s._v("l")]),s._v("; "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v("++) {\n  "),a("span",{attrs:{class:"hljs-attr"}},[s._v("if")]),s._v(" ("),a("span",{attrs:{class:"hljs-attr"}},[s._v("obj")]),s._v("["),a("span",{attrs:{class:"hljs-attr"}},[s._v("keys")]),s._v("["),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v("]]) {}\n}\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("console.timeEnd")]),s._v("('"),a("span",{attrs:{class:"hljs-attr"}},[s._v("getObj")]),s._v("');\n\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("console.time")]),s._v("('"),a("span",{attrs:{class:"hljs-attr"}},[s._v("delObj")]),s._v("');\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("for")]),s._v(" ("),a("span",{attrs:{class:"hljs-attr"}},[s._v("let")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(" = "),a("span",{attrs:{class:"hljs-string"}},[s._v("0,")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("l")]),s._v(" = "),a("span",{attrs:{class:"hljs-string"}},[s._v("dels.length;")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(" < "),a("span",{attrs:{class:"hljs-attr"}},[s._v("l")]),s._v("; "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v("++) {\n  "),a("span",{attrs:{class:"hljs-attr"}},[s._v("delete")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("obj")]),s._v("["),a("span",{attrs:{class:"hljs-attr"}},[s._v("keys")]),s._v("["),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v("]];\n}\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("console.timeEnd")]),s._v("('"),a("span",{attrs:{class:"hljs-attr"}},[s._v("delObj")]),s._v("');\n\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("console.time")]),s._v("('"),a("span",{attrs:{class:"hljs-attr"}},[s._v("addToObj2")]),s._v("');\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("const")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("obj2")]),s._v(" = "),a("span",{attrs:{class:"hljs-string"}},[s._v("Object.create(null);")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("for")]),s._v(" ("),a("span",{attrs:{class:"hljs-attr"}},[s._v("let")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(" = "),a("span",{attrs:{class:"hljs-string"}},[s._v("0,")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("l")]),s._v(" = "),a("span",{attrs:{class:"hljs-string"}},[s._v("keys.length;")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(" < "),a("span",{attrs:{class:"hljs-attr"}},[s._v("l")]),s._v("; "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v("++) {\n  "),a("span",{attrs:{class:"hljs-attr"}},[s._v("obj2")]),s._v("["),a("span",{attrs:{class:"hljs-attr"}},[s._v("keys")]),s._v("["),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v("]] = "),a("span",{attrs:{class:"hljs-string"}},[s._v("values[i];")]),s._v("\n}\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("console.timeEnd")]),s._v("('"),a("span",{attrs:{class:"hljs-attr"}},[s._v("addToObj2")]),s._v("');\n\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("console.time")]),s._v("('"),a("span",{attrs:{class:"hljs-attr"}},[s._v("getObj2")]),s._v("');\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("for")]),s._v(" ("),a("span",{attrs:{class:"hljs-attr"}},[s._v("let")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(" = "),a("span",{attrs:{class:"hljs-string"}},[s._v("0,")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("l")]),s._v(" = "),a("span",{attrs:{class:"hljs-string"}},[s._v("gets.length;")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(" < "),a("span",{attrs:{class:"hljs-attr"}},[s._v("l")]),s._v("; "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v("++) {\n  "),a("span",{attrs:{class:"hljs-attr"}},[s._v("if")]),s._v(" ("),a("span",{attrs:{class:"hljs-attr"}},[s._v("obj2")]),s._v("["),a("span",{attrs:{class:"hljs-attr"}},[s._v("keys")]),s._v("["),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v("]]) {}\n}\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("console.timeEnd")]),s._v("('"),a("span",{attrs:{class:"hljs-attr"}},[s._v("getObj2")]),s._v("');\n\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("console.time")]),s._v("('"),a("span",{attrs:{class:"hljs-attr"}},[s._v("delObj2")]),s._v("');\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("for")]),s._v(" ("),a("span",{attrs:{class:"hljs-attr"}},[s._v("let")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(" = "),a("span",{attrs:{class:"hljs-string"}},[s._v("0,")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("l")]),s._v(" = "),a("span",{attrs:{class:"hljs-string"}},[s._v("dels.length;")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(" < "),a("span",{attrs:{class:"hljs-attr"}},[s._v("l")]),s._v("; "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v("++) {\n  "),a("span",{attrs:{class:"hljs-attr"}},[s._v("delete")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("obj2")]),s._v("["),a("span",{attrs:{class:"hljs-attr"}},[s._v("keys")]),s._v("["),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v("]];\n}\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("console.timeEnd")]),s._v("('"),a("span",{attrs:{class:"hljs-attr"}},[s._v("delObj2")]),s._v("');\n\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("console.time")]),s._v("('"),a("span",{attrs:{class:"hljs-attr"}},[s._v("addToMap")]),s._v("');\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("const")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("map")]),s._v(" = "),a("span",{attrs:{class:"hljs-string"}},[s._v("new")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("Map")]),s._v("();\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("for")]),s._v(" ("),a("span",{attrs:{class:"hljs-attr"}},[s._v("let")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(" = "),a("span",{attrs:{class:"hljs-string"}},[s._v("0,")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("l")]),s._v(" = "),a("span",{attrs:{class:"hljs-string"}},[s._v("keys.length;")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(" < "),a("span",{attrs:{class:"hljs-attr"}},[s._v("l")]),s._v("; "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v("++) {\n  "),a("span",{attrs:{class:"hljs-attr"}},[s._v("map.set")]),s._v("(["),a("span",{attrs:{class:"hljs-attr"}},[s._v("keys")]),s._v("["),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v("]], "),a("span",{attrs:{class:"hljs-attr"}},[s._v("values")]),s._v("["),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v("]);\n}\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("console.timeEnd")]),s._v("('"),a("span",{attrs:{class:"hljs-attr"}},[s._v("addToMap")]),s._v("');\n\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("console.time")]),s._v("('"),a("span",{attrs:{class:"hljs-attr"}},[s._v("getMap")]),s._v("');\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("for")]),s._v(" ("),a("span",{attrs:{class:"hljs-attr"}},[s._v("let")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(" = "),a("span",{attrs:{class:"hljs-string"}},[s._v("0,")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("l")]),s._v(" = "),a("span",{attrs:{class:"hljs-string"}},[s._v("gets.length;")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(" < "),a("span",{attrs:{class:"hljs-attr"}},[s._v("l")]),s._v("; "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v("++) {\n  "),a("span",{attrs:{class:"hljs-attr"}},[s._v("if")]),s._v(" ("),a("span",{attrs:{class:"hljs-attr"}},[s._v("map.get")]),s._v("("),a("span",{attrs:{class:"hljs-attr"}},[s._v("keys")]),s._v("["),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v("])) {}\n}\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("console.timeEnd")]),s._v("('"),a("span",{attrs:{class:"hljs-attr"}},[s._v("getMap")]),s._v("');\n\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("console.time")]),s._v("('"),a("span",{attrs:{class:"hljs-attr"}},[s._v("delMap")]),s._v("');\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("for")]),s._v(" ("),a("span",{attrs:{class:"hljs-attr"}},[s._v("let")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(" = "),a("span",{attrs:{class:"hljs-string"}},[s._v("0,")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("l")]),s._v(" = "),a("span",{attrs:{class:"hljs-string"}},[s._v("dels.length;")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v(" < "),a("span",{attrs:{class:"hljs-attr"}},[s._v("l")]),s._v("; "),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v("++) {\n  "),a("span",{attrs:{class:"hljs-attr"}},[s._v("map.delete")]),s._v("("),a("span",{attrs:{class:"hljs-attr"}},[s._v("keys")]),s._v("["),a("span",{attrs:{class:"hljs-attr"}},[s._v("i")]),s._v("])\n}\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("console.timeEnd")]),s._v("('"),a("span",{attrs:{class:"hljs-attr"}},[s._v("delMap")]),s._v("');\n")])])])])},function(){var s=this.$createElement,t=this._self._c||s;return t("p",[this._v("for (let i = 0; i < Len; i++) {\nkeys.push("),t("code",{pre:!0},[this._v("key_${i}")]),this._v(");\nvalues.push("),t("code",{pre:!0},[this._v("value_${i}")]),this._v(");\ni % 3 === 0 && gets.push(i);\ni % 5 === 0 && dels.push(i);\n}\nconst obj = {};\nconst map = new Map();\nconst nullObj = Object.create(null);\nfunction case1() {\nconsole.time('addToObj');\nfor (let i = 0, l = keys.length; i < l; i++) {\nobj[keys[i]] = values[i];\n}\nconsole.timeEnd('addToObj');")])},function(){var s=this.$createElement,t=this._self._c||s;return t("pre",{pre:!0},[t("code",{attrs:{"v-pre":""}},[this._v("\n## 是否必要缓存？\n>>>>>>> fix: 404\n")])])}]},l=a("VU/8")(null,n,!1,null,null,null);t.default=l.exports},x1LI:function(s,t,a){s.exports=a("jjpO")}});
//# sourceMappingURL=7.92317764dcff2e896af4.js.map