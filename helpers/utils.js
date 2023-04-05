// The isObject function returns true if the value passed as an argument is an object and not an array, and false otherwise.
export function isObject(object) {
  return (
    !!object &&
    typeof object === "object" &&
    !Array.isArray(object) &&
    object !== null
  );
}
// The "sortDescCompareFn" function returns a comparator function that can be used with the sort method of an array to sort the elements in ascending order based on their values.
export function sortAscCompareFn() {
  return (a, b) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    return 0;
  };
}
// The "sortDescCompareFn" function returns a comparator function that can be used with the sort method of an array to sort the elements in descending order based on their values.
export function sortDescCompareFn(a, b) {
  return (a, b) => {
    if (a > b) {
      return -1;
    } else if (a < b) {
      return 1;
    }
    return 0;
  };
}
// The "isSpace" function returns true if the given string only contains whitespace characters or is empty, and false otherwise.
export function isSpace(str) {
  return !str.replace(/\s/g, "").length;
}

export function trimObjProperties(object) {
  if (!isObject(object)) throw new TypeError("Parameter should be an object");

  for (const key in object) {
    object[key] = object[key].toString().trim();
  }

  return object;
}

export const largeTextHandler = (n, input) => {
  if (!input) return null;
  if (input.length > n) {
    const nombre = input.split("").splice(0, n);
    nombre.push("...");
    return nombre.join("");
  }
  return input;
};