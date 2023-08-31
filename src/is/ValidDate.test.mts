import { listCheckerTests } from './tests.private.mjs';
import { isValidDate } from './ValidDate.mjs';

for (const { key, input, expected } of listCheckerTests('ValidDate')) {
  test(`${key} → ${expected}`, () => {
    expect(isValidDate(input)).toBe(expected);
  });
}
