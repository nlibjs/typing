import { listCheckerTests } from './tests.private.mjs';
import { isNonPositiveSafeInteger } from './NonPositiveSafeInteger.mjs';

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
