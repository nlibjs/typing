import { listCheckerTests } from './tests.private.mjs';
import { isNonNegativeSafeInteger } from './NonNegativeSafeInteger.mjs';

for (const { key, input, expected } of listCheckerTests(
  'NegativeZero',
  'PositiveZero',
  'Zero',
  'PositiveInteger',
  'HttpResponseStatusCodeOk',
  'HttpResponseStatusCodeNotFound',
)) {
  test(`${key} → ${expected}`, () => {
    expect(isNonNegativeSafeInteger(input)).toBe(expected);
  });
}
