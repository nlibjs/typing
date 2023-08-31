import { listCheckerTests } from './tests.private.mjs';
import { isBase64String } from './Base64String.mjs';

for (const { key, input, expected } of listCheckerTests(
  'Base64',
  'CapitalLatin',
  'SmallLatin',
  'Digits65',
  'Digits64',
  'Localhost',
  'NonEmptyString',
  'HttpMethodGet',
  'HttpMethodOptions',
  'Hex',
  'SmallHex',
  'CapitalHex',
)) {
  test(`${key} → ${expected}`, () => {
    expect(isBase64String(input)).toBe(expected);
  });
}
