// 注入 request方法
// mock
function xhr (request) {
  return new Promise((resolve, reject) => {
    resolve({})
  })
}

// 将 requestSchema 转化成 xhr 依赖的
function resolveRequest(req) {
  // url header method data dataType responseType getApiTask
  const result = req.request;
  if (req.getTask) {
    result.getApiTask = (task) => {
      req.getTask(task, req.requestId)
    }
  }
  return req
}

// 将 response 转化成 responseSchema
function resolveResponse(res, reqConf) {
  return Object.assign({data: res}, reqConf)
}

function request(requestConf) {
  // 转化 requestSchema
  return xhr(resolveRequest(requestConf))
    .then((res) => resolveResponse(res, requestConf), err => Promise.reject(resolveResponse(err, requestConf)))
}

export default request