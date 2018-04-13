function invalidCases(needed, provided) {
  if (provided.length !== needed.length) return true;
  for (let i in provided) if (provided[i] !== needed[i]) return true;
  return false;
}

const defaultProto = {
  match(branches) {
    const providedCases = Object.keys(branches);
    if (invalidCases(providedCases.sort(), this.__cases__))
      throw new Error(
        `You need to provide cases for all of: ${this.__cases__.join(
          ", "
        )}, but instead provided ${providedCases.join(", ")}`
      );
    return branches[this.__name](...this.value);
  },
  toString() {
    return (
      this.__name +
      (this.__fields ? `(${this.value.map(v => v.toString()).join(", ")})` : "")
    );
  }
};

const defaultStatics = {
  match(cases) {
    return instance => instance.match(cases);
  }
};

export const _ = {};

export function Type(cases, proto, statics) {
  function Type(name, fields, values) {
    this.__name = name;
    this.__fields = fields.length;
    if (values.length !== this.__fields)
      throw new Error(
        `Not enough fields provided for ${name}, was expecting ${
          this.__fields
        } value${this.__fields !== 1 ? "s" : ""} but received: ${values.join(
          ", "
        )}`
      );
    values.forEach((value, i) => {
      if (value == null)
        throw new Error(`Argument ${i} was provided a null value: ${value}`);
    });
    this.value = values;
  }
  Object.assign(Type.prototype, proto, defaultProto);
  const casesKeys = Object.keys(cases).sort();
  Type.prototype.__cases__ = casesKeys;
  Object.assign(Type, statics, defaultStatics);
  casesKeys.forEach(c => {
    Type[c] = (...args) => new Type(c, cases[c], args);
  });
  return Type;
}
