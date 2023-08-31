import { listCheckerTests } from './tests.private';
import { isSmallHexString } from './SmallHexString';

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
