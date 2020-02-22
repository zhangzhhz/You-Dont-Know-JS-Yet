function testTrippleEqual() {
  let t1 = Date.now();
  for (let i = 0; i < 10000000; i++) {
    1 === '1';
  }
  let t2 = Date.now();
  console.log(t2 - t1);
}

function testDoubleEqual() {
  let t1 = Date.now();
  for (let i = 0; i < 10000000; i++) {
    1 == '1';
  }
  let t2 = Date.now();
  console.log(t2 - t1);
}

function testTrippleEqual2() {
  let t1 = Date.now();
  for (let i = 0; i < 10000000; i++) {
    '1' === '1';
  }
  let t2 = Date.now();
  console.log(t2 - t1);
}

function testDoubleEqual2() {
  let t1 = Date.now();
  for (let i = 0; i < 10000000; i++) {
    '1' == '1';
  }
  let t2 = Date.now();
  console.log(t2 - t1);
}

testTrippleEqual(); // faster
testDoubleEqual(); // slower

// about the same time.
testTrippleEqual2();
testDoubleEqual2();