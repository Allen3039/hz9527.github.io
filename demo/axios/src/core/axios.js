// 暴露 request response get post put setDefault interceptors
import {request, adapter} from ''
function propDecorator(conf = {enumerable: true}) {
  return function (target, name, descriptor) {
    return Object.assign(descriptor, conf)
  }
}
// function resolveData(result, fn, target, ...arg) {
//   if (result && result.constructor === Promise) {
//     return result.then((res) => fn.call(target, ...arg, res))
//       .catch((err) => fn.call(target, ...arg, err))
//   } else {
//     return fn.call(target, ...arg, result)
//   }
// }

// 这里还是异步执行吧，在拦截器中甚至有依赖其他接口返回的可能性
class Interceptor {
  resolveHandlers = []
  rejectHandlers = []
  use(resolver, rejecter) {
    typeof resolver === 'function' && this.resolveHandlers.push(resolver);
    typeof rejecter === 'function' && this.rejectHandlers.push(resolver)
  }
  runResolver(data) {
    return this._run(0, data, 'rejectHandlers');
  }
  runRejector(data) {
    return this._run(0, data, 'rejectHandlers');
  }
  _run(i = 0, data, handlerName) {
    if (i >= this[handlerName].length) return data;
    const result = this[handlerName][i++](data);
    return this._run(i, result, handlerName);
  }
}

class Axios {
  constructor(config, parent) {
    this.config = config;
    this.parent = parent;
    this.children = [];
    this.interceptors = {
      request: new Interceptor(),
      response: new Interceptor()
    }
  }
  @propDecorator()
  create(config) {
    const child = Axios(config, this);
    this.children.push(child);
    return child;
  }
  @propDecorator()
  setConfig(config, cover = false) {

  }
  @propDecorator()
  request(config) {
    const requestConf = this.interceptors.request.run(this.resolveConfig(config)); // config adapter 在resolveConfig（返回标准的request）内部实现
    return request(adapter(reqConfig))
      .then(res => {
        let response = this.resolveRes(res) //
      })
      .catch(err => {

      })

  }
  resolveConfig(config) {
    return '标准的request'
  }
  resolveRes(res, type) {
    return '标准的response'
  }
  @propDecorator()
  get(config) {
    return this.request(Object.assign({}, config, {method: 'GET'}))
  }
  @propDecorator()
  put(config) {
    return this.request(Object.assign({}, config, {method: 'PUT'}))
  }
  @propDecorator()
  post(config) {
    return this.request(Object.assign({}, config, {method: 'POST'}))
  }
}
