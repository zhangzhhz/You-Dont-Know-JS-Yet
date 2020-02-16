"use strict";

let myObject = {
  a: 2,
  b: 3,
  c: 5,
  d: 8,
  x: "Hello",
  y: "World",
}

Object.defineProperty(myObject, Symbol.iterator, {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function() {
    let o = this;
    let keys = Object.keys(o);
    let idx = 0;
    return {
      next: function() {
        return {
          value: o[keys[idx++]],
          done: idx > keys.length
        };
      }
    };
  }
});

for (let v of myObject) {
  console.log(v);
}

console.log(Object.keys(myObject));