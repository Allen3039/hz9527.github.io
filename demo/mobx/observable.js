import {checkType} from './utils';
observable.ArrayPropConf = new Set(['push', 'pop', 'shift', 'unshift', 'splice', 'sort']);
observable.taskList = []; // 需要去重
observable.taskList.push = function(value, listener) {
  observable.taskList[observable.taskList.length] = value;
  observable.runner(listener);
}
observable.runner = function (fn) {
  Promise.resolve()
    .then(() => {
      for (let i = 0; i < observable.taskList.length; i++) {
        fn(observable.taskList.shift())
      }
    })
}


observable.getHandler = function (schema, type, keys, listener) {
  // 不要更改参数，因为它们是闭包～
  const handler = {
    set(target, prop, value) {
      let old = target[prop];
      if (old !== value) {
        // 当 target[prop] 在 schema 中是引用类型，需要让 value observable
        if (schema && schema[prop]) {
          value = observable(schema[prop], listener, keys, value);
        }
        target[prop] = value;
        let newKeys = keys ? `${keys}${type === 'array' ? '[' + prop + ']' : '.' + prop}` : prop;
        observable.taskList.push({old, now: value, keys: newKeys}, listener)
      }
      return true;
    }
  }
  if (type === 'array') {
    handler.get = function(target, prop) {
      if (observable.ArrayPropConf.has(prop)) {
        return function(...args) {
          let old = target.slice();
          target[prop](...args);
          observable.taskList.push({old, now: target, keys}, listener)
        }
      }
    }
  }
  return handler;
}

// 在 schema 引用发生变化时需要重新定义子 schema
function observable(schema, listener = () => {}, rootKey = '', defaultValue) {
  let result = defaultValue;
  let type = checkType(schema);
  if (type === 'object' || type === 'array') {
    result = defaultValue || type === 'object' ? {} : [];
    for (let key in schema) { // 注意，不是 for of
      let keys = `${rootKey ? rootKey + '.' : ''}${key}`
      result[key] = observable(schema[key], listener, keys, result[key]);
    }
    result = new Proxy(result, observable.getHandler(schema, type, rootKey, listener));
  }
  return result || defaultValue;
}


export default observable

