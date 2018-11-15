# Type

Use the function `Type` to create a new sum type. Use `_` as a placeholder for
argument slots if you want.

```js
import { Type, _ } from "@joakin/sum-types";
```

## `_`

Just a placeholder to use when defining types

```js
const Card = Type({
  Credit: [_, _, _],
  Debit: [_, _]
});
```

## `Type(options, [prototype], [statics]): SumType`

* `options`: `{ [OptionName]: any[] }`
  * Object of options for the sum types. The **keys** will become functions on
    the returned sum type, and the **values** are an array to define how many
    params the option needs

```js
const Status = Type({
  Loading: [],
  Success: [_],
  Error: [_, _]
});

const status = Status.Success(42);
// > Success(42)
```

* `prototype`: `{ [methodName]: Function }`
  * Object of methods or variables to attach to the type's prototype

```js
const Status = Type(
  {
    Loading: [],
    Success: [_],
    Error: [_, _]
  },
  {
    map(fn) {
      return this.match({
        Loading: _ => this,
        Success: value => Status.Success(fn(value)),
        Error: _ => this
      });
    }
  }
);

Status.Loading().map(x => x * x);
// > Loading
```

* `options`: `{ [methodName]: Function }`
  * Object of methods or variables to attach to the type itself

```js
const Status = Type(
  {
    Loading: [],
    Success: [_],
    Error: [_, _]
  },
  {},
  {
    to42String(x) {
      return 42 + x.toString();
    }
  }
);

Status.to42String(Status.Error("Fail", 42));
// > 42Error(Fail, 42)
```

## `SumType`

Calling `Type` will return a new `SumType`, with:

* the options attached as constructor functions
* the statics on it (see example above)
* and a `match` function helper

### `SumType.[Option](...params) : instance`

The options you passed when constructing the type are exposed as functions on
the returned SumType.

```js
const Decision = Type({ Yes: [], No: [] });
const yes = Decision.Yes();
const no = Decision.No();
```

### `SumType.match({ [OptionName]: (...OptionValues) => any }): ((instance) => any)`

`SumType.match` provides a helper to create a function that will match on
options.

```js
const Decision = Type({ Yes: [], No: [] });

const processDecision = Decision.match({
  Yes: _ => "Thank you for staying with us!",
  No: _ => "We're sorry to see you go :("
});

console.log(processDecision(Decision.Yes()));
// > "Thank you for staying with us!"
```

## SumType instance

When you call one of the option constructor functions, you will get an instance
of the sum type.

That instance has by default two methods: `match` and `toString`, plus any
prototype methods defined when creating the sum type.

### `instance.match({ [OptionName]: (...OptionValues) => any }): any`

Match on an instance to have something happen depending on the Option the
instance is. Like a nice `switch` statement that returns the value of the
executed branch.

```js
const Decision = Type({ Yes: [], No: ["num1", "num2"] });

const decision = Decision.No(3, 7);

decision.match({
  Yes: _ => "Thank you for staying with us!",
  No: (num1, num2) => `${num1}, ${num2}. We're sorry to see you go :(`
});
// > "3, 7. We're sorry to see you go :("
```

### `instance.toString(): String`

Prints the instance to String.

```js
const Decision = Type({ Yes: [], No: ["reason"] });

Decision.No("Because no").toString();
// > No(Because no)
```
