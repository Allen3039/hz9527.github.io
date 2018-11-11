# 设计思路

1. axios 是一个函数， 挂载了 Axios实例 所有方法及属性
2. Axios 实例不必将所有属性挂载在 axios 方法上，因为 axios 调用 Axios 方法时会将 this 指向 Axios实例
3. 设置默认项变得可观察，创建时会查找所有父级 config

需要暴露给 axios 方法及属性 addChild request get post put，addListener， interceptors

## 编程风格

```js

import Axios from 'axios';

axios.get/post/put() axios()

const childAxios = axios.create(config)

axios.defaults.xx = xx;

axios.addListener('eventName', cb)
axios.interceptors.request.use(xx)
```