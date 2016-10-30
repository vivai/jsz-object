//@flow
'use strict';

import {test} from 'tape';
import {deepEqual} from '../src/object';

/* eslint-disable no-magic-numbers */

test('deepEqual', function(t) {

  t.ok(typeof deepEqual === 'function',
      'Function deepEqual is imported.');

  let aUndef,
      bUndef,
      aNull = null,
      bNull = null;

  t.true(deepEqual(aUndef, bUndef),
      'deepEqual(aUndef, bUndef,) should be truthy');
  t.true(deepEqual(aNull, bNull),
      'deepEqual(aNull, bNull) should be truthy');
  t.false(deepEqual(aUndef, bNull),
      'deepEqual(aUndef, bNull) should be falsy');
  t.false(deepEqual(aNull, bUndef),
      'deepEqual(aUndef, bNull) should be falsy');

  let aDate = new Date(),
      bDate = aDate,
      cDate = new Date(aDate.getTime());

  t.true(aDate === bDate,
      'aDate === bDate should be truthy');
  t.false(aDate === cDate,
      'aDate === cDate should be falsy');

  t.true(deepEqual(aDate, bDate),
      'deepEqual(aDate, bDate) should be truthy');
  t.true(deepEqual(aDate, cDate),
      'deepEqual(aDate, cDate) should be truthy');

  let aArray = [1,2,3],
      bArray = [1,2,3],
      cArray = [3,2,1],
      dArray = [1];

  t.true(deepEqual(aArray, bArray),
      'deepEqual(aArray, bArray) should be truthy');
  t.false(deepEqual(aArray, cArray),
      'deepEqual(aArray, cArray) should be falsy');
  t.false(deepEqual(aArray, dArray),
      'deepEqual(aArray, dArray) should be falsy');

  let aObj = {a:1, b:{c:{d:42}}},
      bObj = {a:1, b:{c:{d:42}}},
      cObj = {a:1, b:{x:{d:42}}};

  t.true(deepEqual(aObj, bObj),
      'deepEqual(aObj, bObj) should be truthy');
  t.false(deepEqual(aObj, cObj),
      'deepEqual(aObj, cObj) should be falsy');

  let a2Obj = [{a:1, b:2}, {a:2, b: 4}],
      b2Obj = [{a:1, b:2}, {a:2, b: 4}],
      c2Obj = [{a:1, b:2}, {a:2, b: 8}];

  t.true(deepEqual(a2Obj, b2Obj),
      'deepEqual(a2Obj, b2Obj) should be truthy');
  t.false(deepEqual(a2Obj, c2Obj),
      'deepEqual(a2Obj, c2Obj) should be falsy');

  t.end();
});
