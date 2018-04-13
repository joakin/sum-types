# Result

```js
import { Result } from "@joakin/sum-types";

Result.Ok(4).match({
  Ok: num => `Got ${num}`,
  Err: err => `Got ${err}`
});
```

## Options

### `Result.Ok(value: any)`

### `Result.Err(err: any)`

## Prototype methods

### `result.toString()`

### `result.match(options)`

```js
result.match({
  Ok: value => doSomething(value),
  Err: error => doSomethingElse(error)
});
```

### `result.withDefault(defaultValue: any)`

Returns the inner value of the result, giving back the `defaultValue` if the
result was a `Err`.

```js
Result.Ok(4).withDefault(0);
// > 4

Result.Err("Fail").withDefault(0);
// > 0
```

### `result.map(fn)`

Apply `fn` to the inner value if it is a `Ok`. Does nothing if it is an `Err`.

```js
Result.Ok(5)
  .map(x => x * x)
  .toString();
// > Ok(25)

Result.Err("Fail")
  .map(x => x * x)
  .toString();
// > Err(Fail)
```

### `result.mapError(fn)`

Apply `fn` to the inner error if it is a `Err`. Does nothing if it is an `Ok`.

```js
Result.Ok(5)
  .map(x => x * x)
  .toString();
// > Ok(25)

Result.Err("Fail")
  .map(x => x * x)
  .toString();
// > Err(Fail)
```

### `result.andThen(fn)`

Apply `fn` to the inner value if it is an `Ok`. Like `.map`, but the function's
return value will be returned directly, without wrapping it in `Ok`, so `fn`
should return a `Result` itself.

```js
Result.Ok(5)
  // Square numbers >= 5
  .andThen(x => (x >= 5 ? Result.Ok(x * x) : Result.Err("Less than 5")))
  .toString();
// > Ok(25)
```

### `result.toMaybe()`

Convert the result into a maybe.

```js
Result.Ok(5)
  .toMaybe()
  .toString();
// > Just(5)

Result.Err("Fail")
  .toMaybe()
  .toString();
// > Nothing
```

### `result.unwrap()`

Convert the result into a JS value. Will throw the error if it was `Err`, or
return the inner value if it was an `Ok`.

```js
Result.Ok(5).unwrap();
// > 5

Result.Err("Fail").unwrap();
// > Uncaught Error: Fail
```

## Static methods

### `Result.match`

Inherited from `Type`

### `Result.try(fn)`

Get a result from running a function. If `fn` throws, the failure will be
capture and wrapped in `Err`.

```js
t.equal(
  Result.try(() => {
    throw new Error("Fail");
  }).toString(),
  "Err(Error: Fail)"
);
t.equal(Result.try(() => 5).toString(), "Ok(5)");
```

### `Result.fromMaybe(value: Maybe): Result`

Create a result from a maybe. If the value is a `Maybe.Just`, it will become a
`Ok`, otherwise a `Ok(value)`.

```js
Result.fromMaybe("Failed", Maybe.Just(5)).toString();
// > Ok(5)

Result.fromMaybe("Failed", Maybe.Nothing()).toString();
// > Err(Failed)
```

### `Result.fromPromise(value: Promise<value, err>): Promise<Result<value, err>`

Convert the `Promise<value, error>` into a `Promise<Result<value, error>>`.

```js
Result.fromPromise(Promise.resolve(5)).then(
  result => console.log(result.toString())
  // > Ok(5)
);
Result.fromPromise(Promise.reject("Fail")).then(
  result => console.log(result.toString())
  // > Err(Fail)
);
```

```js
async function get(title) {
  const json = fetch(url(title)).then(res => res.json());
  return await Result.fromPromise(json);
}

(async () => {
  const coordinates = (await get("Alicante")).map(data => data.coords);
  coordinates.match({
    Ok: coords => console.log(`City is at: ${coords}`),
    Err: err => console.error(`City couldn't be found. Reason: ${err}`)
  });
})();
```

### `Result.map(fn, ...results): Result`

Map `fn` over a list of results. `fn` will be called only if all values are
`Ok`, with the values unwrapped, and return the result of `fn` in a `Ok`.

```js
Result.map((x, y) => x * y, Result.Ok(5), Result.Ok(3)).toString();
// > Ok(15)

Result.map((x, y) => x * y, Result.Ok(5), Result.Err("Fail")).toString();
// > Err(Fail)
```
