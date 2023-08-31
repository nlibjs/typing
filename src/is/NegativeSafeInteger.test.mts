import { listCheckerTests } from './tests.private.mjs';
import { isNegativeSafeInteger } from './NegativeSafeInteger.mjs';

for (const { key, input, expected } of listCheckerTests('NegativeInteger')) {
  test(`${key} → ${expected}`, () => {
    expect(isNegativeSafeInteger(input)).toBe(expected);
  });
}
