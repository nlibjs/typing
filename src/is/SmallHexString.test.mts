import { listCheckerTests } from './tests.private.mjs';
import { isSmallHexString } from './SmallHexString.mjs';

for (const { key, input, expected } of listCheckerTests(
  'EmptyString',
  'Digits65',
  'Digits64',
  'SmallHex',
)) {
  test(`${key} → ${expected}`, () => {
    expect(isSmallHexString(input)).toBe(expected);
  });
}
