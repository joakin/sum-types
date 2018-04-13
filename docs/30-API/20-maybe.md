# Maybe

```js
import { Maybe } from "@joakin/sum-types";

Maybe.Just(4).match({
  Just: num => `got ${num}`,
  Nothing: _ => `Got nothing`
});
```

## Options

### `Maybe.Just(value: any)`

### `Maybe.Nothing()`

## Prototype methods

### `maybe.toString()`

### `maybe.match(options)`

```js
maybeValue.match({
  Just: value => doSomething(value),
  Nothing: _ => doSomethingElse()
});
```

### `maybe.withDefault(defaultValue: any)`

Returns the inner value of the maybe, giving back the `defaultValue` if the
maybe was a `Nothing`.

```js
Maybe.Just(4).withDefault(0);
// > 4

Maybe.Nothing().withDefault(0);
// > 0
```

### `maybe.map(fn)`

Apply `fn` to the inner value if it is a `Just`. Does nothing if it is a
`Nothing`.

```js
Maybe.Just(5)
  .map(x => x * x)
  .toString();
// > Just(25)

Maybe.Nothing()
  .map(x => x * x)
  .toString();
// > Nothing
```

### `maybe.andThen(fn)`

Apply `fn` to the inner value if it is a `Just`. Like `.map`, but the function's
return value will be returned directly, without wrapping it in `Just`, so `fn`
should return a `Maybe` itself.

```js
Maybe.Just(5)
  // Square numbers >= 5
  .andThen(x => (x >= 5 ? Maybe.Just(x * x) : Maybe.Nothing()))
  .toString();
// > Just(25)
```

### `maybe.unwrap()`

Convert the maybe into a JS value. Will be `null` if it was `Nothing`, or the
inner value if it was a `Just`.

```js
Maybe.Just(5).unwrap();
// > 5

Maybe.Nothing().unwrap();
// > null
```

## Static methods

### `Maybe.match`

Inherited from `Type`

### `Maybe.from(value: any)`

Create a maybe from any JS value. If the value is `null` or `undefined`, it will
become a `Nothing`, otherwise a `Just(value)`.

```js
Maybe.from(null).toString();
// > Nothing

Maybe.from(5).toString();
// > Just(5)
```

### `Maybe.map(fn, ...maybes): Maybe`

Map `fn` over a list of maybes. `fn` will be called only if all values are
`Just`, with the values unwrapped, and return the result of `fn` in a `Just`.

```js
Maybe.map((x, y) => x * y, Maybe.Just(5), Maybe.Just(3)).toString();
// > Just(15)

Maybe.map((x, y) => x * y, Maybe.Just(5), Maybe.Nothing()).toString();
// > Nothing
```
