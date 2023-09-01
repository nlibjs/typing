import { test } from 'node:test';
import * as assert from 'node:assert';
import { listCheckerTests } from './tests.private.mjs';
import { isSafeInteger } from './SafeInteger.mjs';

for (const { key, input, expected } of listCheckerTests(
  'NegativeInteger',
  'PositiveInteger',
  'NegativeZero',
  'Zero',
  'PositiveZero',
  'HttpResponseStatusCodeOk',
  'HttpResponseStatusCodeNotFound',
)) {
  test(`${key} → ${expected}`, () => {
    assert.equal(isSafeInteger(input), expected);
  });
}
