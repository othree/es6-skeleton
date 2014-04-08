
var mod = require('./libmod');

mod.init();


var [a, b, c, d] = [1, 2, 3, 4];

console.log(a, b ,c);

var list = [1, 2, 3, 4];
var res = (for (x of list) x);

var acc = '';
for (var x of res) {
  acc += x;
}
console.log(acc);

var array = [for (x of [0, 1, 2]) x];

console.log(array);
