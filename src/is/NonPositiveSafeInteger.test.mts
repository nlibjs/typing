import { test } from 'node:test';
import * as assert from 'node:assert';
import { listCheckerTests } from './tests.private.mjs';
import { isNonPositiveSafeInteger } from './NonPositiveSafeInteger.mjs';

for (const { key, input, expected } of listCheckerTests(
  'NegativeZero',
  'PositiveZero',
  'Zero',
  'NegativeInteger',
)) {
  test(`${key} → ${expected}`, () => {
    assert.equal(isNonPositiveSafeInteger(input), expected);
  });
}
