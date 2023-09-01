import { test } from 'node:test';
import * as assert from 'node:assert';
import { listCheckerTests } from './tests.private.mjs';
import { isNonPositiveFiniteNumber } from './NonPositiveFiniteNumber.mjs';

for (const { key, input, expected } of listCheckerTests(
  'NegativeZero',
  'PositiveZero',
  'Zero',
  'NegativeInteger',
  'NegativeFloat',
  'NegativeUnsafeInteger',
)) {
  test(`${key} → ${expected}`, () => {
    assert.equal(isNonPositiveFiniteNumber(input), expected);
  });
}
