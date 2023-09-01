import { test } from 'node:test';
import * as assert from 'node:assert';
import { listCheckerTests } from './tests.private.mjs';
import { isNonNegativeFiniteNumber } from './NonNegativeFiniteNumber.mjs';

for (const { key, input, expected } of listCheckerTests(
  'NegativeZero',
  'PositiveZero',
  'Zero',
  'PositiveInteger',
  'PositiveFloat',
  'PositiveUnsafeInteger',
  'HttpResponseStatusCodeOk',
  'HttpResponseStatusCodeNotFound',
)) {
  test(`${key} → ${expected}`, () => {
    assert.equal(isNonNegativeFiniteNumber(input), expected);
  });
}
