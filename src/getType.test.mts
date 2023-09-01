import { test } from 'node:test';
import * as assert from 'node:assert';
import { getType } from './getType.mjs';

const tests: Array<[unknown, string]> = [
  [null, 'Null'],
  [undefined, 'Undefined'],
  [true, 'Boolean'],
  [false, 'Boolean'],
  [0, 'Number'],
  [NaN, 'Number'],
  [Infinity, 'Number'],
  ['0', 'String'],
  [{}, 'Object'],
  [[], 'Array'],
  [new Uint32Array(1), 'Uint32Array'],
  [/.*/, 'RegExp'],
];
for (const [value, expected] of tests) {
  test(`${value} → ${expected}`, () => {
    assert.equal(getType(value), expected);
  });
}
