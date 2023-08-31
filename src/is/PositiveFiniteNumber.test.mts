import { listCheckerTests } from './tests.private.mjs';
import { isPositiveFiniteNumber } from './PositiveFiniteNumber.mjs';

for (const { key, input, expected } of listCheckerTests(
  'PositiveInteger',
  'PositiveUnsafeInteger',
  'PositiveFloat',
  'HttpResponseStatusCodeOk',
  'HttpResponseStatusCodeNotFound',
)) {
  test(`${key} → ${expected}`, () => {
    expect(isPositiveFiniteNumber(input)).toBe(expected);
  });
}
