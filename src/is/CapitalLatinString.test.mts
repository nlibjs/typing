import { test } from 'node:test';
import * as assert from 'node:assert';
import {
  CapitalLatinCharacters,
  isCapitalLatinString,
} from './CapitalLatinString.mjs';
import { listCheckerTests } from './tests.private.mjs';

test('CapitalLatinCharacters', () => {
  assert.equal(isCapitalLatinString(CapitalLatinCharacters), true);
});

for (const { key, input, expected } of listCheckerTests(
  'EmptyString',
  'CapitalLatin',
  'HttpMethodGet',
  'HttpMethodOptions',
)) {
  test(`${key} → ${expected}`, () => {
    assert.equal(isCapitalLatinString(input), expected);
  });
}
