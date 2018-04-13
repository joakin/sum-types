import { Type, _ } from "./type";
import Maybe from "./maybe";

const Result = Type(
  {
    Ok: [_],
    Err: [_]
  },
  {
    withDefault(x) {
      return this.match({
        Ok: value => value,
        Err: _ => x
      });
    },
    map(fn) {
      return this.match({
        Ok: value => Result.Ok(fn(value)),
        Err: _ => this
      });
    },
    mapError(fn) {
      return this.match({
        Ok: _ => this,
        Err: err => Result.Err(fn(err))
      });
    },
    andThen(fn) {
      return this.match({
        Ok: value => fn(value),
        Err: _ => this
      });
    },
    toMaybe() {
      return this.match({
        Ok: value => Maybe.Just(value),
        Err: _ => Maybe.Nothing()
      });
    },
    unwrap() {
      return this.match({
        Ok: value => value,
        Err: error => {
          throw error;
        }
      });
    }
  },
  {
    try(fn) {
      try {
        return Result.Ok(fn());
      } catch (e) {
        return Result.Err(e);
      }
    },
    fromMaybe(err, maybe) {
      return maybe.match({
        Just: value => Result.Ok(value),
        Nothing: _ => Result.Err(err)
      });
    },
    fromPromise(promise) {
      return promise
        .then(value => Result.Ok(value))
        .catch(err => Result.Err(err));
    },
    map(fn, ...results) {
      const values = [];
      for (let i in results) {
        try {
          values.push(results[i].unwrap());
        } catch (e) {
          return Result.Err(e);
        }
      }
      return Result.Ok(fn(...values));
    }
  }
);

export default Result;
