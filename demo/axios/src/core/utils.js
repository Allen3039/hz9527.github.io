import RequestId from "./requestId";

const DefaultsSchema = {
  headers: {
    common: Object,
    post: Object,
    get: Object,
    put: Object
  },
  responseType: String,
  baseURL: String,
  adapter: Function,
  paramsSerializer: Function,
  genId: Function
}

const ConfigSchema = {
  url: String,
  method: String,
  baseURL: String,
  transformRequest: Array,
  transformResponse: Array,
  headers: Object,
  params: Object,
  paramsSerializer: Function,
  data: Object,
  adapter: Function,
  responseType: String,
  genId: Function,
  requestId: RequestId,
  getTask: Function
}

function getObjBySchema(schema, obj) {
  let result;
  if (schema && obj && typeof schema === 'object') {
    result = schema.constructor === Array ? [] : {};
    for (let key in obj) {
      if (key in schema && obj[key].constructor === schema[key]) {
        result[key] = getObjBySchema(schema[key], obj[key])
      }
    }
  }
  return result || obj;
}

function deepMerge(obj1, obj2) { // 将 obj2 合并前一个值
  let result;
  if (obj2 && typeof obj2 === 'object') {
    if (!obj1) return obj2;
    if (obj1.constructor !== obj2.constructor) return obj1; // 忽略合并
    result = obj1;
    for (let key in obj2) {
      if (!(key in obj1)) {
        result[key] = obj2[key]
      } else {
        result[key] = deepMerge(obj1[key], obj2[key])
      }
    }
  } else {
    result = obj1 || obj2;
  }
  return result;
}

function handlerTransforms(fns, data, ...args) {
  fns.forEach(fn => {
    data = fn(data, ...args)
  })
  return data;
}

function resolveResquest(config) {
  // todo handler responseType
  const result = {};
  // 处理 url
  result.url = (config.baseURL || '') + config.url;
  // 处理params
  if (config.params) {
    let search
    if (config.paramsSerializer) {
      search = config.paramsSerializer(config.params)
    } else {
      for (let key in config.params) {
        search = search ? '&' : '';
        search += `${key}=${config.params[key]}`
      }
    }
    // 去掉hash后拼接
    let hash = ''
    let url = result.url.replace(/#.+/, sub => {
      hash = sub;
      return '';
    });
    if (url.indexOf('?') > -1) {
      url = url.replace(/\?/, `?${search}&`)
    } else {
      url += `?${search}`
    }
    result.url = url + hash;
  }
  result.header = config.headers;
  result.method = config.method;
  if (result.method !== 'GET') {
    result.data = config.data;
    if (config.transformRequest) {
      result.data = handlerTransforms(config.transformRequest, result.data, config.headers)
    }
  }
  return result
}
// 将 config 转化成 requestSchema
// schema已经校验了类型，所以这里不需要校验了
function resolveConfig(config) {
  const result = {
    config: {}
  };
  if (config.adapter) {
    result.request = config.adapter(config);
  }
  if (!config.requestId && config.genId) {
    let requestId = config.genId();
    if (requestId && requestId.constructor === ConfigSchema.requestId) {
      result.config.requestId = requestId;
    }
  }
  if (config.getTask) {
    result.config.getTask = config.getTask
  }
  // 处理 request
  if (!result.request) {
    result.request = resolveResquest(config)
  }
  return result;
}
// 将 传入config 与 默认合并
const Methods = ['GET', 'POST', 'PUT']
function mergeConfig(config, defaults) {
  const result = {};
  Object.keys(config)
    .forEach(key => {
      if (ConfigSchema[key] && ConfigSchema[key] === config[key].constructor) {
        result[key] = config[key]
      }
    })
  // 设置默认方法
  if (result.method) result.method = result.method.toUpperCase()
  if (!result.method || Methods.every(m => m !== result.method)) {
    result.method = 'GET';
  }
  // 合并默认项
  for (let key in defaults) {
    if (!(key in result) && key !== 'headers') {
      result[key] = defaults[key];
    }
  }
  // 设置 headers
  if (defaults.headers && (defaults.headers[result.method.toLowerCase()] || defaults.headers.common)) {
    !result.headers && (result.headers = {})
    result.headers = Object.assign({}, defaults.headers.common || {}, defaults.headers[result.method.toLowerCase()] || {}, result.headers);
  }
  return result;
}

// 设置默认
function setDefault(config, isMerge, defaults) {
  if (!isMerge) return getObjBySchema(DefaultsSchema, config)
  return getObjBySchema(DefaultsSchema, deepMerge(defaults, config))
}

export {
  resolveConfig,
  mergeConfig,
  setDefault,
  handlerTransforms
}