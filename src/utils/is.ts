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
  isPlainObject,
} from "lodash-es";

export default {
  array: isArray,
  number: isNumber,
  boolean: isBoolean,
  error: isError,
  regExp: isRegExp,
  date: isDate,
  string: isString,
  arguments: isArguments,
  func: isFunction,
  object: isObject,
  plainObject: isPlainObject,
};
