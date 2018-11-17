## 小程序原理

### init

1. 检测 data 并 JSON parse stringify 一次
2. 初始化生命周期钩子
3. 其他的重写方法（做性能监控），克隆对象 （如 props， 方法）

### setData

```js
// 去掉不影响主流程代码
setData (newData, completeCb = noop) {
  // 判断 newData 是合法的 （Object）
  // path "arr[0].hello[1].world"
  for (var path in newData) {
    var {obj, key} = getObjectByPath(this.data, path); // 获取一个结果
    obj && (obj[key] = deepClone(newData[path]));
  }
  // 派发 dataChange 事件 给 native
}

function getObjectByPath (data, keyStr) {
  var keys = parsePath(keyStr)
  var result = {}
  var key = void 0;
  var oldData = data;
  for (var ind = 0; ind < keys.length; ind++) {
    let curKey = keys[ind]
    // 以下 ifelse 就是判断原此节点和现此数据节点数据类型是否一致
    /**
      data: {a: 1, b: ''}
      keys: ['a', 0]
      循环前 oldData {a: 1, b: ''} result {}
      第一次循环结束后 result {a: 1, b: ''}; oldData 1
      第二次循环 result.a = []
      注意，一开始将 this.data 将引用给 oldData 第一轮循环结束 oldData 将引用给 result。所以会给 this.data 添加 空数组、空对象 属性
    */
    if (Number(curKey) === curKey && curKey % 1 == 0) {
      if (!Array.isArray(oldData)) { // 原父节点数据不是数组
        result[preKey] = [];
        oldData = result[preKey]
      }
    } else {
      if (getDataType(oldData) !== 'Object') { // 原父节点数据不是对象
        result[preKey] = {}
        oldData = result[preKey]
      }
    }
    preKey = curKey;
    result = oldData;
    oldData = oldData[curKey];
  }
  // obj 根据 keys 获得的叶子对象或数组，key 则是这个叶子对象顶点，如：
  // this.data {a: {b: 1}} keyStr a.b  obj {b: 1}
  return {
    obj: result, // obj是包含 key 的最小一层对象，可以是数组
    key: preKey, // key是原始 key 的最小一层值，可以是数字（下标）
  };
}
```

```js

```