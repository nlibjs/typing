import { listCheckerTests } from './tests.private.mjs';
import { isNonNegativeFiniteNumber } from './NonNegativeFiniteNumber.mjs';

for (const { key, input, expected } of listCheckerTests(
  'NegativeZero',
  'PositiveZero',
  'Zero',
  'PositiveInteger',
  'PositiveFloat',
  'PositiveUnsafeInteger',
  'HttpResponseStatusCodeOk',
  'HttpResponseStatusCodeNotFound',
)) {
  test(`${key} → ${expected}`, () => {
    expect(isNonNegativeFiniteNumber(input)).toBe(expected);
  });
}
