// 暴露 request response get post put setDefault interceptors
import request from './request'
import {resolveConfig, mergeConfig, setDefault, handlerTransforms} from './utils'

function propDecorator(conf = {enumerable: true}) {
  return function (target, name, descriptor) {
    return Object.assign(descriptor, conf)
  }
}

// 这里还是异步执行吧，在拦截器中甚至有依赖其他接口返回的可能性
class Interceptor {
  handlers = []
  use(resolver, rejecter) {
    this.handlers.push({
      resolved: typeof resolver === 'function' ? resolver : void 0,
      rejected: typeof rejecter === 'function' ? rejecter : void 0
    });
    return this.handlers.length - 1;
  }
  remove(ind) {
    this.handlers[ind] && (this.handlers[ind] = null);
  }
  forEach(fn) {
    this.handlers.forEach(handler => {
      handler && fn(handler);
    })
  }
}

// 对外只有 request put get post setDefaults 可枚举
class Axios {
  config = {}
  parent = null
  children = []
  constructor(config, parent) {
    this.config = setDefault(config);
    this.parent = parent;
    this.children = [];
    this.interceptors = {
      request: new Interceptor(),
      response: new Interceptor()
    }
  }
  create(config) {
    const child = new Axios(config, this);
    this.children.push(child);
    return child;
  }
  @propDecorator()
  setDefaults(config, cover = false) {
    this.config = setDefault(config, cover, this.config)
    // 通知 children
    this.children.forEach(axios => {
      axios.acceptDefaultChange(this.config) // 子axios 内会调用 setConfig，递归到所有 子axios
    })
  }
  acceptDefaultChange(config) {
    this.setConfig(config, false, this.config)
  }
  @propDecorator()
  request(config) {
    // 标准的request处理为 request方法 所支持的request在 request方法 内部实现，request方法 返回的response处理为 标准的response 也在 request方法 内部实现
    let promiseChain = [request, void 0] // 偶数位为 then 奇数位为 catch
    // 拦截器为先执行父拦截器再执行自己拦截器，这样考虑的原因是 如果子拦截器修改了数据不一定能被父拦截器处理，先公后私
    let requestInterceptors = []
    let responseInterceptors = [];
    let self = this;
    while (parent !== null) {
      requestInterceptors = self.resolveInterceptors(self.interceptors.request).concat(requestInterceptors);
      responseInterceptors = self.resolveInterceptors(self.interceptors.response).concat(responseInterceptors);
      parent = parent.parent;
    }
    promiseChain = requestInterceptors.concat(promiseChain).concat(responseInterceptors);
    // 执行 promise 链
    let i = 0;
    // config adapter 在resolveConfig 内部实现 最后返回标准的request
    const Conf = mergeConfig(config, this.config);
    let promise = promise.resolve(resolveConfig(Conf))
    while (i < promiseChain.length) {
      promise = promise.then(promiseChain[i++], promiseChain[i++])
    }
    if (Conf.transformResponse) {
      promise = promise.then(res => handlerTransforms(res), err => Promise.reject(handlerTransforms(err)))
    }
    return promise;
  }
  resolveInterceptors(interceptors) {
    let result = []
    interceptors.forEach.call(target, (handler) => {
      result.push(handler.resolved, handler.rejected)
    })
  }
  resolveConfig(config) {
    return resolveConfig(mergeConfig(config, this.config))
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
