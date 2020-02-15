"use strict";

/* Lesson learned:
   Do not update an enclosed vairable directly.
   Use a locally defined variable inside the closure function, 
   or pass the eclosed variable to another function (inside the closure function)
   as an argument.
*/

function range(start,end) {
  console.log(`start = ${start}`);
  let s = start; 
  /* Having a variable here outside of function `rangeTo` 
     or directly using `start` in function `rangeTo` 
     will make the last 2 lines print incorrect value
     when using the while loop which updates `s` or `start` directly.
      start3(3);     // [3]
      start3(8);     // [3,4,5,6,7,8], actually printed [4,5,6,7,8]
      start3(10);    // [3,4,5,6,7,8,9,10], actually printed [9,10]
     The same `s` is used across different calls to `rangeTo()` 
     that is returned to variable `start3`.
  */
  function rangeTo(end) {
    // let s = start;
    // Using a locally defined variable `s` here to store the value of 
    // `start` will fix the issue.
    console.log(`s = ${s}`);
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

// range(3,3);    // [3]
// range(3,8);    // [3,4,5,6,7,8]
// range(3,0);    // []

var start3 = range(3);
// var start4 = range(4);

console.log("***** start3(3) *****");
start3(3);     // [3]
console.log("***** start3(8) *****");
start3(8);     // [3,4,5,6,7,8]
console.log("***** start3(10) *****");
start3(10);     // [3,4,5,6,7,8, 9, 10]
console.log("***** start3(0) *****");
start3(0);     // []

// start4(6);     // [4,5,6]
