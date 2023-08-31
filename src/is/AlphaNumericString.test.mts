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
    expect(isAlphaNumericString(input)).toBe(expected);
  });
}
