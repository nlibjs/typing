import { test } from 'node:test';
import * as assert from 'node:assert';
import { isCapitalHexString } from './CapitalHexString.mjs';
import { listCheckerTests } from './tests.private.mjs';

for (const { key, input, expected } of listCheckerTests(
  'EmptyString',
  'Digits65',
  'Digits64',
  'CapitalHex',
)) {
  test(`${key} → ${expected}`, () => {
    assert.equal(isCapitalHexString(input), expected);
  });
}
