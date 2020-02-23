1. Blocks

Another commonly cited JS gotcha (related to coercion -- see Chapter 4) is:

```
[] + {}; // "[object Object]"
{} + []; // 0
```

This seems to imply the `+` operator gives different results depending on whether the first operand is the `[]` or the `{}`. But that actually has nothing to do with it!

On the first line, `{}` appears in the `+` operator's expression, and is therefore interpreted as an actual value (an empty `object`). Chapter 4 explained that `[]` is coerced to `""` and thus `{}` is coerced to a `string` value as well: `"[object Object]"`.

But on the second line, `{}` is interpreted as a standalone `{}` empty block (which does nothing). Blocks don't need semicolons to terminate them, so the lack of one here isn't a problem. Finally, `+ []` is an expression that explicitly coerces (see Chapter 4) the `[]` to a number, which is the `0` value.

2.

Function parameter default values kick in when no arguments or `undefined`s are passed to a funciton. `null` as a argument will not trigger default vaue.

