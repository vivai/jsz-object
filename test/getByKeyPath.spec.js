//@flow
'use strict';

import {test} from 'tape';
import {getByKeyPath, getByKeyArray} from '../src/object';

/* eslint-disable no-magic-numbers */

test('getByKeyPath', function(t) {

  t.ok(typeof getByKeyPath === 'function',
      'Function getByKeyPath is imported.');

  let obj = {
    a: 1,
    b: {
      c: 3,
      d: 4
    },
    e: [1, 2, 3],
    f: [{a:10}, {a:11}, {a:{b:22}}]
  }

  t.equal(getByKeyPath(obj, 'a'), 1,
      'getByKeyPath(obj, "a");');
  t.equal(getByKeyPath(obj, 'f.0.a'), 10,
      'getByKeyPath(obj, "f.0.a");');

  t.equal(getByKeyArray(obj, ['f', '0', 'a']), 10,
      'getByKeyPath(obj, "f.0.a");');

  t.deepEqual(getByKeyPath(obj, ''), obj);

  t.end();

});
