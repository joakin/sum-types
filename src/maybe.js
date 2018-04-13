import { Type, _ } from "./type";

const Maybe = Type(
  {
    Just: [_],
    Nothing: []
  },
  {
    withDefault(x) {
      return this.match({
        Just: value => value,
        Nothing: _ => x
      });
    },
    map(fn) {
      return this.match({
        Just: value => Maybe.Just(fn(value)),
        Nothing: _ => this
      });
    },
    andThen(fn) {
      return this.match({
        Just: value => fn(value),
        Nothing: _ => this
      });
    },
    unwrap() {
      return this.match({
        Just: value => value,
        Nothing: _ => null
      });
    }
  },
  {
    from(x) {
      return x != null ? Maybe.Just(x) : Maybe.Nothing();
    },
    map(fn, ...maybes) {
      const values = [];
      for (let i in maybes) {
        const value = maybes[i].unwrap();
        if (value == null) return Maybe.Nothing();
        else values.push(value);
      }
      return Maybe.Just(fn(...values));
    }
  }
);

export default Maybe;
