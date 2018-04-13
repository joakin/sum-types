import test from "tape";
import { Maybe } from "../src/index";

test("Maybe", t => {
  const five = Maybe.Just(5);
  const nothing = Maybe.Nothing();
  t.equal(five.toString(), "Just(5)");
  t.equal(nothing.toString(), "Nothing");
  t.equal(five.withDefault(1), 5);
  t.equal(nothing.withDefault(1), 1);
  t.equal(five.map(x => x * x).withDefault(1), 25);
  t.equal(nothing.map(x => x * x).withDefault(1), 1);
  t.equal(five.andThen(x => Maybe.Just(7)).withDefault(1), 7);
  t.equal(nothing.andThen(x => Maybe.Just(7)).withDefault(1), 1);
  t.equal(five.unwrap(), 5);
  t.equal(nothing.unwrap(), null);

  t.equal(Maybe.from(null).withDefault(1), 1);
  t.equal(Maybe.from(5).withDefault(1), 5);
  t.equal(Maybe.map((x, y) => x * y, five, nothing).withDefault(1), 1);
  t.equal(Maybe.map((x, y) => x * y, nothing, five).withDefault(1), 1);
  t.equal(Maybe.map((x, y) => x * y, five, five).withDefault(1), 25);
  t.end();
});
