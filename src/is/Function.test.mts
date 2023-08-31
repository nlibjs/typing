import { listCheckerTests } from './tests.private.mjs';
import { isFunction } from './Function.mjs';

for (const { key, input, expected } of listCheckerTests('Function', 'Class')) {
  test(`${key} → ${expected}`, () => {
    expect(isFunction(input)).toBe(expected);
  });
}
