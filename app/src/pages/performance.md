# 吹毛求疵的 js 性能

<b class='type'>js</b>
<b class='kw'>js 性能</b> <b class='kw'>数组、Set、对象、Map</b>

> 测试环境 MBP 17款 16G； Chrome 71

## 数组 vs Set

> 数组有很多有点，比如遍历，添加删除操作，等等。但是 es6 出现了 Set，两者在很多方面很像

### 单纯循环 vs push or add

```js
const CASE = 1;
const Len = 1000000;
const arr = [];
const set = new Set();

console.time('for');
for (let i = 0; i < Len; i++) {}
console.timeEnd('for');

function case1() {
  console.time('push');
  for (let i = 0; i < Len; i++) {
    arr.push(`item${i}`);
  }
  console.timeEnd('push');
}

function case2() {
  console.time('push');
  for (let i = 0; i < Len; i++) {
    set.add(`item${i}`);
  }
  console.timeEnd('push');
}
const executors = [case1, case2];
executors[CASE - 1]();
// for 2-3ms
// push 400-500ms 42353720
// add 800-900ms 52891672
```

### 数组查找

```js
const CASE = 1;
const Ind = 5000; // 500 5000 50000 125000 350300 505000 700000 800000
const Len = 1000000;
const arr = [];
const target = `item_${Ind}`
for (let i = 0; i < Len; i++) {
  arr.push(`item_${i}`)
}

function case1() {
  console.time('for');
  for (let i = 0, l = arr.length; i < l; i++) {
    if (arr[i] === target) break;
  }
  console.timeEnd('for');
}

function case2() {
  console.time('find');
  arr.find(item => item === target);
  console.timeEnd('find');
}

function case3() {
  console.time('findIndex');
  const ind = arr.findIndex(item => item === target);
  if (arr[ind]) {}
  console.timeEnd('findIndex');
}

function case3() {
  console.time('indexOf');
  const ind = arr.indexOf(target);
  if (arr[ind]) {}
  console.timeEnd('indexOf');
}

const executors = [case1, case2, case3];
executors[CASE - 1]();
// 500
// for
  // find
  // findIndex
  // indexOf
//5000
  // find
  // findIndex
  // indexOf
// 50000
  // find
  // findIndex
  // indexOf
// 125000
  // find
  // findIndex
  // indexOf
// 350300
  // find
  // findIndex
  // indexOf
// 505000
  // find
  // findIndex
  // indexOf
// 700000
  // find
  // findIndex
  // indexOf
// 800000
  // find
  // findIndex
  // indexOf
```

### 数组查找 vs Set 查找

### 数组删除 vs Set 删除

### 数组修改 vs Set 修改

## 对象

### 对象遍历

### 数组 vs 对象

### 数组遍历 vs 对象遍历

### 数组添加 vs 对象添加成员

### 数组查找 vs 对象查找

### 数组删除 vs 对象删除

### 数组修改 vs 对象修改

## 对象 vs Map

### 对象新增成员 vs Map新增成员

### 对象删除成员 vs Map删除成员

### 对象查找成员 vs Map查找成员

### 对象修改成员 vs Map修改成员

## 结论

> 很多场景下，我们为一些对象建立一定联系又不需要互相存储，因此经常会创建一些索引，那么这些索引需要频繁访问、新增、删除

使用对象、没有原型的对象、map
```js
const keys = [];
const values = [];
const gets = [];
const dels = [];
for (let i = 0; i < 1000000; i++) {
  keys.push(`key_${i}`);
  values.push(`value_${i}`);
  i % 3 === 0 && gets.push(i);
  i % 3 === 1 && dels.push(i)
}

console.time('addToObj');
const obj = {};
for (let i = 0, l = keys.length; i < l; i++) {
  obj[keys[i]] = values[i];
}
console.timeEnd('addToObj');

console.time('getObj');
for (let i = 0, l = gets.length; i < l; i++) {
  if (obj[keys[i]]) {}
}
console.timeEnd('getObj');

console.time('delObj');
for (let i = 0, l = dels.length; i < l; i++) {
  delete obj[keys[i]];
}
console.timeEnd('delObj');

console.time('addToObj2');
const obj2 = Object.create(null);
for (let i = 0, l = keys.length; i < l; i++) {
  obj2[keys[i]] = values[i];
}
console.timeEnd('addToObj2');

console.time('getObj2');
for (let i = 0, l = gets.length; i < l; i++) {
  if (obj2[keys[i]]) {}
}
console.timeEnd('getObj2');

console.time('delObj2');
for (let i = 0, l = dels.length; i < l; i++) {
  delete obj2[keys[i]];
}
console.timeEnd('delObj2');

console.time('addToMap');
const map = new Map();
for (let i = 0, l = keys.length; i < l; i++) {
  map.set([keys[i]], values[i]);
}
console.timeEnd('addToMap');

console.time('getMap');
for (let i = 0, l = gets.length; i < l; i++) {
  if (map.get(keys[i])) {}
}
console.timeEnd('getMap');

console.time('delMap');
for (let i = 0, l = dels.length; i < l; i++) {
  map.delete(keys[i])
}
console.timeEnd('delMap');
```