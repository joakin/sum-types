import test from "tape";
import { Result } from "../src/index";

test("Result", t => {
  t.equal(Result.Ok(5).toString(), "Ok(5)");
  t.equal(Result.Err("Fail").toString(), "Err(Fail)");
  t.equal(Result.Ok(2).withDefault(5), 2);
  t.equal(Result.Err("Fail").withDefault(5), 5);
  t.equal(
    Result.Ok(2)
      .map(x => x * x)
      .withDefault(5),
    4
  );
  t.equal(
    Result.Err("Fail")
      .map(x => x * x)
      .withDefault(5),
    5
  );
  t.equal(
    Result.Ok(2)
      .mapError(x => x + "!!")
      .toString(),
    "Ok(2)"
  );
  t.equal(
    Result.Err("Fail")
      .mapError(x => x + "!!")
      .toString(),
    "Err(Fail!!)"
  );
  t.equal(
    Result.Ok(2)
      .andThen(x => Result.Ok(4))
      .withDefault(5),
    4
  );
  t.equal(
    Result.Ok(2)
      .andThen(x => Result.Err("Fail"))
      .withDefault(5),
    5
  );

  t.equal(
    Result.Ok(2)
      .toMaybe()
      .toString(),
    "Just(2)"
  );
  t.equal(
    Result.Err("Fail")
      .toMaybe()
      .toString(),
    "Nothing"
  );
  t.throws(_ => Result.Err(new Error("Fail")).unwrap(), /Fail/);

  t.equal(
    Result.map((x, y) => x * y, Result.Ok(5), Result.Err("Fail")).toString(),
    "Err(Fail)"
  );
  t.equal(
    Result.map((x, y) => x * y, Result.Err("Fail"), Result.Ok(5)).toString(),
    "Err(Fail)"
  );
  t.equal(
    Result.map((x, y) => x * y, Result.Ok(5), Result.Ok(5)).withDefault(1),
    25
  );

  Promise.all([
    Result.fromPromise(Promise.resolve(5)).then(result =>
      t.equal(result.toString(), "Ok(5)")
    ),
    Result.fromPromise(Promise.reject("Fail")).then(result =>
      t.equal(result.toString(), "Err(Fail)")
    )
  ]).then(_ => t.end());
});
