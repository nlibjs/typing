import { listCheckerTests } from './tests.private';
import { isNonPositiveFiniteNumber } from './NonPositiveFiniteNumber';

for (const { key, input, expected } of listCheckerTests(
  'NegativeZero',
  'PositiveZero',
  'Zero',
  'NegativeInteger',
  'NegativeFloat',
  'NegativeUnsafeInteger',
)) {
  test(`${key} → ${expected}`, () => {
    expect(isNonPositiveFiniteNumber(input)).toBe(expected);
  });
}
