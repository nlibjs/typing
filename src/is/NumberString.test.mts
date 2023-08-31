import { listCheckerTests } from './tests.private.mjs';
import { isNumberString } from './NumberString.mjs';

for (const { key, input, expected } of listCheckerTests(
  'EmptyString',
  'Digits65',
  'Digits64',
)) {
  test(`${key} → ${expected}`, () => {
    expect(isNumberString(input)).toBe(expected);
  });
}
