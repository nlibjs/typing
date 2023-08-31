import { listCheckerTests } from './tests.private.mjs';
import { isArray } from './Array.mjs';

for (const { key, input, expected } of listCheckerTests('EmptyArray')) {
  test(`${key} → ${expected}`, () => {
    expect(isArray(input)).toBe(expected);
  });
}
