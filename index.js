function deepEquals(val1, val2) {
  if (val1 === val2) return true;
  
  if (val1 == null || val2 == null) return false;

  const type1 = typeof val1;
  const type2 = typeof val2;

  if (type1 !== type2) return false;

  if (
    (Array.isArray(val1) === true && Array.isArray(val2) === false) ||
    (Array.isArray(val1) === false && Array.isArray(val2) === true)
  ) {
    return false;
  }
  switch (type1) {
    case "number":
    case "string":
    case "boolean":
    case "symbol":
    case "undefined":
      return val1 === val2;
    case "object":
      if (Array.isArray(val1) && Array.isArray(val2)) {
        if (val1.length !== val2.length) return false;
        
        for (let i = 0; i < val1.length; i++) {
          if (!deepEquals(val1[i], val2[i])) return false;
        }

        return true;
      } else {
        const val1Keys = Object.keys(val1);
        const val2Keys = Object.keys(val2);

        if (val1Keys.length !== val2Keys.length) return false;

        for (let i = 0; i < val1Keys.length; i++) {
          const key = val1Keys[i];

          if (!deepEquals(val1[key], val2[key])) return false;
        }

        return true;
      }
    default:
      return false;
  }
}


console.log(deepEquals(1, 1));
console.log(deepEquals(1, "1"));
console.log(deepEquals(null, null));
console.log(deepEquals(null, undefined));
console.log(deepEquals([], []));
console.log(deepEquals({}, {}));
console.log(deepEquals([], {}));
console.log(deepEquals({ a: 123, b: { c: [4, 5, 6] } }, { a: 123, b: { c: [4, 5, 6] } }));
console.log(deepEquals({ a: 123, b: { c: [4, 5, 6] } }, { b: { c: [4, 5, 6] } }));
console.log(deepEquals({ a: 123, b: { c: [4, 5, 6] } }, { a: 123, b: { c: [4, "5", 6] } }));
console.log(deepEquals([1, 2, [3, 4]], [1, 2, [3, 4]]));
console.log(deepEquals([1, 2, [3, 4, { a: 'abc' }]], [1, 2, [3, 4, { a: 'abc' }]]));
