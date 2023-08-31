import { listCheckerTests } from './tests.private.mjs';
import { isPositiveSafeInteger } from './PositiveSafeInteger.mjs';

for (const { key, input, expected } of listCheckerTests(
  'PositiveInteger',
  'HttpResponseStatusCodeOk',
  'HttpResponseStatusCodeNotFound',
)) {
  test(`${key} → ${expected}`, () => {
    expect(isPositiveSafeInteger(input)).toBe(expected);
  });
}
