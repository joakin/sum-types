# @joakin/sum-types

```
npm install sum-types
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

let state = State.Loading();
let state = State.Success(42);
let state = State.Error(new Error("Failed"));

function toString(state) {
  return state.match({
    Loading: _ => "Loading",
    Success: data => `Got data ${state.data}`,
    Error: err => `Got error: ${state.error}`
  });
}

// Or

const toString = State.match({
  Loading: _ => "Loading",
  Success: data => `Got data ${state.data}`,
  Error: err => `Got error: ${state.error}`
});
```
