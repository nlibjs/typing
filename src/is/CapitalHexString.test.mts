import { isCapitalHexString } from './CapitalHexString.mjs';
import { listCheckerTests } from './tests.private.mjs';

for (const { key, input, expected } of listCheckerTests(
  'EmptyString',
  'Digits65',
  'Digits64',
  'CapitalHex',
)) {
  test(`${key} → ${expected}`, () => {
    expect(isCapitalHexString(input)).toBe(expected);
  });
}
