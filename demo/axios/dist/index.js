'use strict';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function checkType(obj) {
  // return object array function undefined null number...
  var type = _typeof(obj);

  if (type === 'object') {
    if (!obj) return 'null';
    if (obj.constructor === Array) return 'array';
  }

  return type;
} // 非纯函数，照顾到 schema， 不更改引用

observable.ArrayPropConf = new Set(['push', 'pop', 'shift', 'unshift', 'splice', 'sort']);
observable.taskList = []; // 需要去重

observable.taskList.push = function (value, listener) {
  observable.taskList[observable.taskList.length] = value;
  observable.runner(listener);
};

observable.runner = function (fn) {
  Promise.resolve().then(function () {
    for (var i = 0; i < observable.taskList.length; i++) {
      fn(observable.taskList.shift());
    }
  });
};

observable.getHandler = function (schema, type, keys, listener) {
  // 不要更改参数，因为它们是闭包～
  var handler = {
    set: function set(target, prop, value) {
      var old = target[prop];

      if (old !== value) {
        // 当 target[prop] 在 schema 中是引用类型，需要让 value observable
        if (schema && schema[prop]) {
          value = observable(schema[prop], listener, keys, value);
        }

        target[prop] = value;
        var newKeys = keys ? "".concat(keys).concat(type === 'array' ? '[' + prop + ']' : '.' + prop) : prop;
        observable.taskList.push({
          old: old,
          now: value,
          keys: newKeys
        }, listener);
      }

      return true;
    }
  };

  if (type === 'array') {
    handler.get = function (target, prop) {
      if (observable.ArrayPropConf.has(prop)) {
        return function () {
          var old = target.slice();
          target[prop].apply(target, arguments);
          observable.taskList.push({
            old: old,
            now: target,
            keys: keys
          }, listener);
        };
      }
    };
  }

  return handler;
}; // 在 schema 引用发生变化时需要重新定义子 schema


function observable(schema) {
  var listener = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var rootKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var defaultValue = arguments.length > 3 ? arguments[3] : undefined;
  var result = defaultValue;
  var type = checkType(schema);

  if (type === 'object' || type === 'array') {
    result = defaultValue || type === 'object' ? {} : [];

    for (var key in schema) {
      // 注意，不是 for of
      var keys = "".concat(rootKey ? rootKey + '.' : '').concat(key);
      result[key] = observable(schema[key], listener, keys, result[key]);
    }

    result = new Proxy(result, observable.getHandler(schema, type, rootKey, listener));
  }

  return result || defaultValue;
}

var test = observable({
  a: '',
  b: {
    b1: '',
    b2: []
  },
  c: []
}, function (_ref) {
  var keys = _ref.keys,
      old = _ref.old,
      now = _ref.now;
  console.log(keys, old, now);
}); // console.log(test)
// test observable

test.a = 1;
test.c.push(2);
test.b.b2.push(3); // test 更改引用后，仍然 observable

test.b = {
  b1: 2,
  b2: [4]
};
test.b.b1 = 3;
test.d = 233;
console.log(test);
//# sourceMappingURL=index.js.map
