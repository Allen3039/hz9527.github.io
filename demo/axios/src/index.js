import observable from './core/observable';

let test = observable({
  a: '',
  b: {
    b1: '',
    b2: []
  },
  c: []
}, ({keys, old, now}) => {
  console.log(keys, old, now)
});
// console.log(test)

// test observable
test.a = 1;
test.c.push(2);
test.b.b2.push(3);

// test 更改引用后，仍然 observable
test.b = {
  b1: 2,
  b2: [4]
}

test.b.b1 = 3;

test.d = 233;

console.log(test)
