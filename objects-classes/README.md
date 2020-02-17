### `this`

#### Determining `this`

Now, we can summarize the rules for determining `this` from a function call's call-site, in their order of precedence. Ask these questions in this order, and stop when the first rule applies.

1. Is the function called with `new` (**new binding**)? If so, `this` is the newly constructed object.

   `var bar = new foo()`

2. Is the function called with `call` or `apply` (**explicit binding**), even hidden inside a `bind` *hard binding*? If so, `this` is the explicitly specified object.

   `var bar = foo.call( obj2 )`

3. Is the function called with a context (**implicit binding**), otherwise known as an owning or containing object? If so, `this` is *that* context object.

   `var bar = obj1.foo()`

4. Otherwise, default the `this` (**default binding**). If in `strict mode`, pick `undefined`, otherwise pick the `global` object.

   `var bar = foo()`

That's it. That's all it takes to understand the rules of `this` binding for normal function calls. Well... almost.

#### Review (TL;DR)

Determining the `this` binding for an executing function requires finding the direct call-site of that function. Once examined, four rules can be applied to the call-site, in *this* order of precedence:

1. Called with `new`? Use the newly constructed object.

2. Called with `call` or `apply` (or `bind`)? Use the specified object.

3. Called with a context object owning the call? Use that context object.

4. Default: `undefined` in `strict mode`, `global` object otherwise.

Be careful of accidental/unintentional invoking of the default binding rule. In cases where you want to "safely" ignore a `this` binding, a "DMZ" object like `ø = Object.create(null)` is a good placeholder value that protects the `global` object from unintended side-effects.

Instead of the four standard binding rules, ES6 arrow-functions use lexical scoping for `this` binding, which means they adopt the `this` binding (whatever it is) from its enclosing function call. They are essentially a syntactic replacement of `self = this` in pre-ES6 coding.

### Prototype

```
// pre-ES6
// throws away default existing `Bar.prototype`
Bar.prototype = Object.create( Foo.prototype );

// ES6+
// modifies existing `Bar.prototype`
Object.setPrototypeOf( Bar.prototype, Foo.prototype );
```

```
function Foo() {
	// ...
}

var a = new Foo();

Object.getPrototypeOf( a ) === Foo.prototype; // true
```

```
a.__proto__ === Foo.prototype; // true
```

### `instanceof` and `prototype`

```
> o1 = {a:1, b:2}
{ a: 1, b: 2 }
> o2 = Object.create(o1)
{}
> o2.__proto__ === o1
true
> Object.getPrototypeOf(o2) === o1
true
> 
> o2 instanceof o1
Uncaught TypeError: Right-hand side of 'instanceof' is not callable
> 
> function o0() {
... }
undefined
> o0.prototype = o1
{ a: 1, b: 2 }
> o2 instanceof o0
true
> 
> Object.getPrototypeOf(o2) === o0.prototype
true
> o2.__proto__ === o0.prototype
true
> 
> o1.isPrototypeOf(o2)
true
> o0.prototype.isPrototypeOf(o2)
true
```
