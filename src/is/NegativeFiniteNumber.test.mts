import { listCheckerTests } from './tests.private.mjs';
import { isNegativeFiniteNumber } from './NegativeFiniteNumber.mjs';

for (const { key, input, expected } of listCheckerTests(
  'NegativeInteger',
  'NegativeUnsafeInteger',
  'NegativeFloat',
)) {
  test(`${key} → ${expected}`, () => {
    expect(isNegativeFiniteNumber(input)).toBe(expected);
  });
}
