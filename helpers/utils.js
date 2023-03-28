export function isObject(object) {
  return (
    !!object &&
    typeof object === "object" &&
    !Array.isArray(object) &&
    object !== null
  );
}

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

export function isSpace(str) {
  return !str.replace(/\s/g, "").length;
}
