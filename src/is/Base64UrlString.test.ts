import { listCheckerTests } from './tests.private';
import { isBase64UrlString } from './Base64UrlString';

for (const { key, input, expected } of listCheckerTests(
  'Base64Url',
  'CapitalLatin',
  'SmallLatin',
  'Digits65',
  'Digits64',
  'Localhost',
  'NonEmptyString',
  'UUID',
  'NonUUID',
  'HttpMethodGet',
  'HttpMethodOptions',
  'Hex',
  'SmallHex',
  'CapitalHex',
)) {
  test(`${key} → ${expected}`, () => {
    expect(isBase64UrlString(input)).toBe(expected);
  });
}
