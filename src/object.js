// @flow

/**
 * @module jsz-string
 * @desc   This module provides utilities for working with objects.
 */
import {isEmptyString} from 'jsz-string';

let isObject = (object: any): boolean => typeof object === 'object';

/**
 * The {@link deepFreeze()} function freezes a given object  and all nested
 * objects.
 */
export function deepFreeze(object: any): any {
  if (object != null && isObject(object)) {
    Object.getOwnPropertyNames(object).forEach(
        (name) => deepFreeze(object[name]));
    object = Object.freeze(object);
  }

  return object;
}

/**
 * Retrieve a property from an object by key path.
 * @example
 * let 0bj {a:1, b:{c:2}}};
 * getByKeyPath(obj, 'a'); // returns 1
 * getByKeyPath(obj, 'b.c'); // return 2
 */
export let getByKeyPath = (object: Object, keyPath: string): any =>
  isEmptyString(keyPath) ? object : getByKeyArray(object, keyPath.split('.'));

/**
 * Retrieve a property from an object by an array of keys.
 * @example
 * let 0bj {a:1, b:{c:2}}};
 * getByKeyPath(obj, ['a']); // returns 1
 * getByKeyPath(obj, ['b', 'c']); // return 2
 */
export function getByKeyArray( object: Object, keyArray: Array<string>): any {
  let property = object;

  while (property != null && keyArray.length > 0) {
    let key = keyArray.shift();
    property = property[key];
  }

  return property;
}

/**
 * Deep comparsion of two variables.
 */
export function deepEqual(a: any, b: any): boolean {
  let equal = false;

  if (a === b) {
    equal = true;
  } else if (a == null || b == null) {
    equal = false;
  } else if (a instanceof Date && b instanceof Date) {
    equal = a.getTime() === b.getTime();
  } else if (isObject(a)) {
    let aKeys = Object.getOwnPropertyNames(a).sort();
    let bKeys = Object.getOwnPropertyNames(b).sort();
    if (aKeys.length === bKeys.length) {
      equal = aKeys.every(
        (key, index) => key === bKeys[index] && deepEqual(a[key], b[key])
      );
    }
  }

  return equal;
}
