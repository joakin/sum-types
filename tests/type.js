import test from "tape";
import { Type, _ } from "../src/index";

test("Can define union", t => {
  const Status = Type({
    Loading: [],
    Success: [_],
    Error: ["err", "code"]
  });

  t.equal(Status.Loading().toString(), "Loading");
  t.equal(Status.Success(1).toString(), "Success(1)");
  t.equal(
    Status.Error(new Error("err"), 201).toString(),
    "Error(Error: err, 201)"
  );

  t.end();
});

test("Cant define union with incorrect types", t => {
  const Status = Type({
    Loading: [],
    Success: [_],
    Error: [_, _]
  });

  t.throws(
    _ => Status.Success(1, 2),
    /Not enough fields provided for Success, was expecting 1 value but received: 1, 2/
  );
  t.throws(
    _ => Status.Success(),
    /Not enough fields provided for Success, was expecting 1 value but received: /
  );
  t.throws(
    _ => Status.Error(1, 2, 3),
    /Not enough fields provided for Error, was expecting 2 values but received: 1, 2, 3/
  );
  t.throws(
    _ => Status.Error(1),
    /Not enough fields provided for Error, was expecting 2 values but received: 1/
  );

  t.end();
});

test("Can define union with methods and statics", t => {
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
    },
    {
      toString(x) {
        return 42 + x.toString();
      }
    }
  );

  t.equal(
    Status.Success(4)
      .map(x => x * 2)
      .toString(),
    "Success(8)"
  );
  t.equal(Status.toString(Status.Loading()), "42Loading");
  t.end();
});
