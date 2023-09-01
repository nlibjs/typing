import { test } from 'node:test';
import * as assert from 'node:assert';
import { listCheckerTests } from './tests.private.mjs';
import { isAlphaNumericString } from './AlphaNumericString.mjs';

for (const { key, input, expected } of listCheckerTests(
  'EmptyString',
  'NonEmptyString',
  'SmallLatin',
  'CapitalLatin',
  'HttpMethodGet',
  'HttpMethodOptions',
  'Localhost',
  'Digits64',
  'Digits65',
  'Hex',
  'SmallHex',
  'CapitalHex',
)) {
  test(`${key} → ${expected}`, () => {
    assert.equal(isAlphaNumericString(input), expected);
  });
}
