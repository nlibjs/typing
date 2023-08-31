import { listCheckerTests } from './tests.private';
import { isNonPositiveSafeInteger } from './NonPositiveSafeInteger';

for (const { key, input, expected } of listCheckerTests(
  'NegativeZero',
  'PositiveZero',
  'Zero',
  'NegativeInteger',
)) {
  test(`${key} → ${expected}`, () => {
    expect(isNonPositiveSafeInteger(input)).toBe(expected);
  });
}
