/**
 * Various isX type predicates
 */

/** Tests if a value is null */
export const isNull = (value: any): value is null => value === null;

/** Tests if a value is undefined */
export const isUndefined = (value: any): value is undefined =>
  typeof value === "undefined";

/** Tests if a value is null or undefined */
export const isNullOrUndefined = (value: any): value is null | undefined =>
  isNull(value) || isUndefined(value);

/** Tests if a value is an object */
export const isObject = (value: any): value is object =>
  typeof value === "object";

/** Tests if a value is a non-null object */
export const isNonNullObject = (value: any): value is object =>
  isObject(value) && value !== null;

/** Tests if a value is an empty object */
export const isEmptyObject = (value: any): value is {} =>
  isNonNullObject(value) && Object.keys(value).length === 0;

/** Tests if a value is a string */
export const isString = (value: any): value is string =>
  typeof value === "string";

/** Tests if a value is a number */
export const isNumber = (value: any): value is number =>
  typeof value === "number";

/** Tests if a value is an integer */
export const isInteger = (value: any): value is number =>
  isNumber(value) && Number.isInteger(value);

/** Tests if a value is an integer */
export const isNonIntegerNumber = (value: any): value is number =>
  isNumber(value) && !Number.isInteger(value);

/** Tests if a value is a boolean */
export const isBoolean = (value: any): value is boolean =>
  typeof value === "boolean";

/** Tests if a value is a function */
// tslint:disable-next-line:ban-types
export const isFunction = (value: any): value is Function =>
  typeof value === "function";

/** Tests if a value is a symbol */
export const isSymbol = (value: any): value is symbol =>
  typeof value === "symbol";

/** Tests if a value is an array */
export const isArray = (value: any): value is any[] => Array.isArray(value);
