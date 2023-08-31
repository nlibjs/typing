import { listCheckerTests } from './tests.private.mjs';
import { isBoolean } from './Boolean.mjs';

for (const { key, input, expected } of listCheckerTests('True', 'False')) {
  test(`${key} → ${expected}`, () => {
    expect(isBoolean(input)).toBe(expected);
  });
}
