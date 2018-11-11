import {checkType} from './utils';

class ObservableObj {
  taskList = []
  linsteners = []
  constructor(sehcem) {
    
  }
  addListener(listener) {
    this.linsteners.push(listener)
  }
  run() {
    
  }
  observable(sechem, key, value) {
    let result = value;
    let type = checkType(schema);
    if (type === 'object') {
      // proxy
      result = value || {};
      for (let prop in schema) {
        let keys = `${key && key + '.'}prop`
        // schema 终点是 null 或 function, function 进行校验规则 ,若函数名为大写开头，默认为构造函数校验，否则是check
        if (schema[prop] === null || checkType(schema[prop]) === 'function') {
          let _prop;
          Object.defineProperty(result, prop, {
            set(value) {
              if (schema[prop] === 'function') {
                if (!(/[A-Z]/.test(schema[prop].name[0]) && value && value.constructor === schema[prop])) return;
                if (!schema[prop](value)) return;
              }
              let old = result[prop];
              _prop = value;
              this.run(old, value, keys);
            }
          })
        } else {
          this.observable(schema[prop], keys, result);
        }
      }
    } else if (type === 'array') {
      // 如果数组中有一项，则该项是校验规则或者 schema
    }
  }
}

// test

let arr = [];
// let proxy = {};
var v;
Object.defineProperty(arr, 'length', {
  writable : true,
  enumerable : false,
  configurable : true,
  get() {
    return v;
  },
  set(value) {
    console.log(value, 'lengthChange');
    v = value;
  }
})

arr[0] = 1;
arr.push(2333)

let proxy = {};
let v;
Object.defineProperty(proxy, 'length', {
  get() {
    return v;
  },
  set(value) {
    console.log(value, 'lengthChange');
    v = value;
  }
})

Object.defineProperty(proxy, 'length', {
  get() {
    return v + 1;
  },
  set(value) {
    console.log(value, '233');
    v = value - 1;
  }
})

proxy.length = 3;