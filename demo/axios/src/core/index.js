import Axios from './axios'
import RequestId from './requestId'

function axiosFactor(config = {}, target) {
  const axios = target ? target.create(config) : new Axios(config);
  const result = axios.request;
  for (let key in axios) { // 只需要继承方法，并将this指向axios实例, 不需要将其他部分暴露给 result
    if (typeof axios[key] === 'function')
      result[key] = axios[key].bind(axios)
  }
  request.genId = function() {
    return new RequestId();
  }
  result.create = function(conf) {
    return axiosFactor(conf, axios)
  }
  return result;
}

const axios = axiosFactor();

export default axios;