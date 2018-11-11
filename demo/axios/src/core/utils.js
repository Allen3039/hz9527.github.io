function checkType (obj) {
  // return object array function undefined null number...
  let type = typeof obj;
  if (type === 'object') {
    if (!obj) return 'null';
    if (obj.constructor === Array) return 'array';
  }
  return type;
}
// 非纯函数，照顾到 schema， 不更改引用
function deepMerge(obj1, obj2) {
  let type1 = checkType(obj1)
  const type2 = checkType(obj2)
  if (type2 === 'array' || type2 === 'object') {
    if (type1 !== type2) {
      obj1 = obj2;
    } else {
      for (let key in obj2) {
        if (key in obj1) {
          obj1[key] = obj2[key]
        }
      }
    }
  }
  obj1 = obj2;
  return obj1;
}

export {
  checkType
}