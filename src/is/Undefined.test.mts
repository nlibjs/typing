import { listCheckerTests } from './tests.private.mjs';
import { isUndefined } from './Undefined.mjs';

for (const { key, input, expected } of listCheckerTests('Undefined')) {
  test(`${key} → ${expected}`, () => {
    expect(isUndefined(input)).toBe(expected);
  });
}
