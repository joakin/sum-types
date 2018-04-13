# @joakin/sum-types

```
npm install @joakin/sum-types
```

`sum-types` provides union|adt|sum types for JS.

Exhaustiveness checking, `Maybe` and `Result` types, and a nice API.

[Read the docs](https://joakin.github.io/sum-types)

```js
import { Type } from "@joakin/sum-types";

const State = Type({
  Loading: [],
  Success: ["data"],
  Error: ["error"]
});

let state1 = State.Loading();
let state2 = State.Success(42);
let state3 = State.Error(new Error("Failed"));

function toString(state) {
  return state.match({
    Loading: _ => "Loading",
    Success: data => `Got data ${data}`,
    Error: err => `Got error: ${err}`
  });
}

// Or

const toString = State.match({
  Loading: _ => "Loading",
  Success: data => `Got data ${data}`,
  Error: err => `Got error: ${err}`
});
```
