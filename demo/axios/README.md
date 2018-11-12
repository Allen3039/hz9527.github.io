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

axios.setDefaults(conf, Boolean) // 全量 or 增量

axios.interceptors.request.use(xx)
```

## axiosApi设计

1. axios.create 返回 子 axios
2. axios.request axios.get axios.post axios.put axios 请求
3. axios.interceptors 拦截器
4. axios.setDefaults 默认设置

> 注：子 axios 与 axios 方法一致。子 axios 将继承 axios 的拦截器，默认设置等。（这样做是可能业务层分了模块，如游客模块的请求和登录后请求公用部分不同）

### 关于 config

```js
Config {
  // 请求url，若有baseUrl会拼接
  url: '/user',
  // get post put会忽略此项
  method: 'get',
  baseURL: 'https://some-domain.com/api/',
  // 更改 Request data 在拦截器前执行 仅限 'PUT', 'POST'
  transformRequest: [function (data, headers) {
    return data;
  }],
  // 更改 response 在拦截器后执行
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    return data;
  }],
  headers: {'X-ttAxiosed-With': 'XMLHttpttAxios'},
  // 会作为 URLSearchParams
  params: {
    ID: 12345
  },
  // 序列化 params 会覆盖默认序列化方法
  paramsSerializer: function (params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },
  // 作为 body
  data: {
    firstName: 'Fred'
  },
  // 转化成 基础网络服务想要的样子，即一个参数列表
  adapter: function (config) {},
  // 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json',
  genId: () => axios.genId(),
  requestId: axios.genId(),
  // 获取网络请求返回对象 如XHR对象
  getTask(task, requestId) {
    task.abort();
  }
}
```

### 关于 defaults

可继承部分 interceptors，baseURL，adapter，responseType

```js
Defaults {
  headers: {
    common: {xx: yy},
    post,
    get,
    put
  },
  responseType,
  baseURL: String,
  adapter,
  paramsSerializer,
  genId // 生成id的方法，默认不生成id，但是id必须是 axios.genId的返回
}
```

## 内部实现

requestSchema

```js
{
  config: {
    requestId, // 调用者传入
    getTask // 传入 requestId 后第二个参数就是 requestId
  },
  request: {
    header,
    url,
    method,
    data
  }
}
```

responseSchema

```js
{
  data: response,
  request,
  config
}
```