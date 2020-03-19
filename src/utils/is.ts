import isNumber from "is-number";
import {
  isArray,
  isBoolean,
  isError,
  isRegExp,
  isDate,
  isString,
  isArguments,
  isFunction,
  isObject,
  isPlainObject
} from "lodash";

let is = Object.create(null);

Object.assign(is, {
  array: isArray,
  number: isNumber,
  boolean: isBoolean,
  error: isError,
  regExp: isRegExp,
  date: isDate,
  string: isString,
  arguments: isArguments,
  function: isFunction,
  object: isObject,
  plainObject: isPlainObject
});

export default is;
