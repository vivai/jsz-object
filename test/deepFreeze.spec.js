//@flow
'use strict';

import {test} from 'tape';
import {deepFreeze} from '../src/object';

/* eslint-disable no-magic-numbers */

test('deepFreeze', function(t) {

  t.ok(typeof deepFreeze === 'function',
      'Function deepFreeze is imported.');

  let obj = {
    a: 1,
    b: {
      c: 3,
      d: 4
    },
    e: [1, 2, 3],
    f: [{a:10}, {a:11}, {a:{b:22}}]
  }

  deepFreeze(obj);

  t.throws(() => {obj.a = 33}, /TypeError/,
      'obj.a = 33 throws a TypeError exception');

  t.throws(() => {obj.b.c = 33}, /TypeError/,
      'obj.b.c = 33 throws a TypeError exception');

  t.throws(() => {obj.e.push(33)}, /TypeError/,
      'obj.e.push(33) throws a TypeError exception');

  let obj2 = {...obj, b:{c:42, d:4}};
  let obj2a = {
    a: 1,
    b: {
      c: 42,
      d: 4
    },
    e: [1, 2, 3],
    f: [{a:10}, {a:11}, {a:{b:22}}]
  }

  t.deepEqual(obj2, obj2a);

  t.end();

});
