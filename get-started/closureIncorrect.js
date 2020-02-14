"use strict";


function range(start,end) {
  let s = start; 
  /* Having a variable here outside of function `rangeTo` 
     or directly using `start` in function `rangeTo` 
     will make the last 2 lines print incorrect value.
      start3(3);     // [3]
      start3(8);     // [3,4,5,6,7,8], actually printed [4,5,6,7,8]
      start3(10);     // [3,4,5,6,7,8,9,10], actually printed [9,10]
     It appears that 
  */
  function rangeTo(end) {
    // let s = start; // Using a locally defined variable here to store the value of `start` will fix the issue.
    let arr = [];
    /*
    for (let i = start; i <= end; i++) {
      arr.push(i);
    }
    */
    
    while (true) {
      if (s > end) {
        break;
      }
      arr.push(s);
      s++;
    }
    
    console.log(arr);
  }

  if (end === undefined) {
    return rangeTo;
  }
  else {
    return rangeTo(end);
  }
}

range(3,3);    // [3]
range(3,8);    // [3,4,5,6,7,8]
range(3,0);    // []

var start3 = range(3);
var start4 = range(4);

start3(3);     // [3]
start3(8);     // [3,4,5,6,7,8]
start3(10);     // [3,4,5,6,7,8, 9, 10]
start3(0);     // []

start4(6);     // [4,5,6]
