"use strict";

function range(start,end) {
  function getRange(start, end) {
    let arr = [];
    /*
    for (let i = start; i <= end; i++) {
      arr.push(i);
    }
    */
    // the following is not correct.
    
    while (true) {
      if (start > end) {
        break;
      }
      arr.push(start);
      start++;
    }
    
    console.log(arr);
  }

  function curried(e) {
    return getRange(start, e);
  }
  if (end === undefined) {
    return curried;
  }
  else {
    getRange(start, end);
  }
}

range(3,3);    // [3]
range(3,8);    // [3,4,5,6,7,8]
range(3,0);    // []

var start3 = range(3);
var start4 = range(4);

start3(3);     // [3]
start3(8);     // [3,4,5,6,7,8]
start3(0);     // []

start4(6);     // [4,5,6]
