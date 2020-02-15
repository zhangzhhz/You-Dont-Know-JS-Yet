1.
>A function declaration is hoisted and initialized to its function value (again, called function hoisting). A var variable is also hoisted, but it's only auto-initialized to undefined. Any subsequent function expression assignments to that variable don't happen until that statement is reached during run-time execution.

2.
`var` can declare and/or assign the same variable multiple times. `let` cannot.

3.
```
studentName = "Suzy";   // let's try to initialize it!
// ReferenceError

console.log(studentName);

let studentName;
```
>we said that `var studentName`; is not the same as `var studentName = undefined;`, but here with `let`, they behave the same. The difference comes down to the fact that `var studentName` automatically initializes at the top of the scope, where `let studentName` does not.
>
>Recall that we asserted a few times so far that *Compiler* ends up removing any `var` / `let` / `const` declaration statements, replacing them with the instructions at the top of each scope to register the appropriate identifiers.
>
>So if we analyze what's going on here, we see that an additional nuance is that *Compiler* is also adding an instruction in the middle of the program, at the point where the variable `studentName` was declared, to do the auto-initialization. We cannot use the variable at any point prior to that initialization occuring. The same goes for `const` as it does for `let`.
>
>The term coined by TC39 to refer to this *period of time* from the entering of a scope to where the auto-initialization of the variable occurs, is: **Temporal Dead Zone (TDZ)**. The TDZ is the time window where a variable exists but is still uninitialized, and therefore cannot be accessed in any way. Only the execution of the instructions left by *Compiler* at the point of the original declaration can do that initialization. After that moment, the TDZ is over, and the variable is free to be used for the rest of the scope.
>
>By the way, "temporal" in TDZ does indeed refer to time not position-in-code. Consider:
```
askQuestion();
// ReferenceError

let studentName = "Suzy";

function askQuestion() {
    console.log(`${ studentName }, what do you think?`);
}
```
>Even though positionally the `console.log(..)` referencing `studentName` comes *after* the `let studentName` declaration, timing wise the `askQuestion()` function is invoked *before*, while `studentName` is still in its TDZ!
>
>There's a common misconception that TDZ means `let` and `const` do not hoist. I think this is an inaccurate, or at least misleading, claim.
>
>The actual difference is that `let` / `const` declarations do not automatically initialize, the way `var` does. The debate then is if the auto-initialization is part of hoisting, or not? I think auto-registration of a variable at the top of the scope (i.e., what I call "hoisting") and auto-initialization (to `undefined`) are distinct operations and shouldn't be lumped together under the single term "hoisting".
>
>We've already seen `let` and `const` don't auto-initialize at the top of the scope. But let's prove that `let` and `const` do hoist (auto-register at the top of the scope), courtesy of our friend shadowing (see "Shadowing" in Chapter 3):
```
var studentName = "Kyle";

{
    console.log(studentName);
    // Node.js gives the following error:
    // Uncaught ReferenceError: Cannot access 'studentName' before initialization
    // Firefox developer console gives the following error:
    // ReferenceError: can't access lexical declaration `studentName' before initialization

    // ..

    let studentName = "Suzy";

    console.log(studentName);
    // Suzy
}
```
>So to summarize, TDZ errors occur because `let` / `const` declarations do hoist their declarations to the top of their scopes, but unlike `var`, they defer the auto-initialization of their variables until the moment in the code's sequencing where the original declaration appeared. This window of time (hint: temporal), whatever its length, is the TDZ.
>How can you avoid TDZ errors?
>
>My advice: always put your `let` and `const` declarations at the top of any scope. Shrink the TDZ window to zero (or near zero) time, and then it'll be moot.
>
>But why is TDZ even a thing? Why didn't TC39 dictate that `let` / `const` auto-initialize the way `var` does? Just be patient, we'll come back to explore the *why* of TDZ in Appendix A.

4.
```
function diff(x,y) {
    if (x > y) {
        let tmp = x;
        x = y;
        y = tmp;
    }

    return y - x;
}

diff(3,7);      // 4
diff(7,5);      // 2
```
>In this simple example, it doesn't seem to matter whether `tmp` is inside the `if` block or whether it belongs at the function level -- but it certainly shouldn't be a global variable! However, following the POLE principle, `tmp` should be as hidden in scope as possible. So we block scope `tmp` (using `let`) to the `if` block.

5.
>Closure is actually a live link, a preservation of the full variable itself. We're not limited to merely reading its value; the closed-over variable can be updated (reassigned) as well.

```
var fns = [];

for (var i = 0; i < 3; i++) {
    fns[i] = function fn(){
        // closure over `i`
        return i;
    };
}

fns[0]();   // 3 -- WHY!?
fns[1]();   // 3
fns[2]();   // 3
```

To make it behave as we natually expect, use a new variable in each iteration:
```
var fns = [];

for (let i = 0; i < 3; i++) {
    // new variable `j` created each iteration,
    // which gets a copy of the value of `i` at
    // this moment.
    let j = i;
    fns[i] = function fn(){
        // closure over `j` not `i`
        return j;
    };
}

fns[0]();   // 0
fns[1]();   // 1
fns[2]();   // 2
```
Or, use an IIFE which takes in the current `i` as the argument. This is similar to the above approach.
```
var fns = [];

for (var i = 0; i < 3; i++) {
    fns[i] = (function fn(idx){
        function innerFn() {          
          return idx;
        }
        return innerFn;
    })(i);
}
```
Or, change `var` to `let` in `for` loop:
```
var fns = [];

for (let i = 0; i < 3; i++) {
    // the `let i` gives us a new `i`
    // for each iteration automatically!    
    fns[i] = function fn(){
        return i;
    };
}

fns[0]();   // 0
fns[1]();   // 1
fns[2]();   // 2
```
>If you use `let` (or `const`) in a `for`-loop header, not only does JS block-scope the declaration to the loop, but actually to **each iteration of the loop**. In other words, 3 `i`s are created, one for each loop, so the closure *just works* as expected.

6.
