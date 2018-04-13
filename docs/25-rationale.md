# Rationale

In JavaScript, we usually model data with boolean flags in combination:

```js
const state {
  loading: false,
  data: null,
  error: null
}
```

Modeling data with product types (loading **and** data **and** error), means
there are many impossible states that can be possible, which means bugs will
sneak in, and the complexity of our code handling these flags will sky rocket.
We can find ourselves with `loading: true`, but `data` having information on it,
and many other combinations of things that don't make sense.

There is a better way, using sum types (loading **or** data **or** error), which
we can use in JS, but the language doesn't really make it easy for you to do so.
Sum types on JS rely on objects with a `type` flag and switch statements, or
class polymorphism, and `instanceof` types. Because it is hard to do, in the
end, we just don't do it.

```js
/*
 * Sum types with plain objects
 */
const loading = _ => ({ type: "loading" });
const success = d => ({ type: "success", data: d });
const error = err => ({ type: "error", error: err });

let state1 = loading();
let state2 = success(42);
let state3 = error(new Error("Failed"));

function toString(state) {
  switch (state.type) {
    case "loading":
      return "Loading";
    case "success":
      return `Got data ${state.data}`;
    case "error":
      return `Got error: ${state.error}`;
  }
}

/*
 * Sum types with classes
 */
class State {}
class Loading extends State {}
class Success extends State {
  constructor(data) {
    this.data = data;
  }
}
class StateError extends State {
  constructor(err) {
    this.error = err;
  }
}

let state1 = new Loading();
let state2 = new Success(42);
let state3 = new StateError(new Error("Failed"));

function toString(state) {
  if (state instanceof Loading) {
    return "Loading";
  } else if (state instanceof Success) {
    return `Got data ${state.data}`;
  } else if (state instanceof StateError) {
    return `Got error: ${state.error}`;
  }
}
```

Having a small library that helps you model sum types with ease and helps you
not forget any of the options of the sum type, is crucial to modeling our data
in JS. That is why `@joakin/sum-types` exists. See the previous example with
this library:

```js
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

If you forget any branch of the sum type, or give an incorrect number of
parameters when constructing an options, the library will throw an error to let
you know.

## Why another sum type library?

I wanted a sum-types library for JS that was:

* Small
* Well tested
* Provides some default types like `Maybe`, `Result`, and `RemoteData`
* Does exhaustiveness checking on the options when matching
* Has a easy to use and readable JS-like interface
* Publishes ES modules and umd version

There are plenty of sum type libraries, see the options below. They are great
options and I've used them in projects before. They all served as inspiration
for this one, but had some things I didn't agree with:

* They use a functional style without providing object methods, which makes them
  clunkier to use than necessary in JS
* And don't provide exhaustiveness checking. If you forget a case they won't
  give you an error
* `union-type` does not provide any types like `Result` and `Maybe` and does
  type checking, which is quite unlike JS
* `results` is stuck at v0, and the API is too rust like, and doesn't provide
  object methods
* `sum-types`: the api with the array syntaxes is less than optimal

## Other libraries and inspiration

* https://github.com/paldepind/union-type
* https://github.com/uniphil/results
* https://www.npmjs.com/package/sum-types
* http://package.elm-lang.org/packages/elm-lang/core/latest
