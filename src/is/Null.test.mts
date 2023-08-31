import { listCheckerTests } from './tests.private.mjs';
import { isNull } from './Null.mjs';

for (const { key, input, expected } of listCheckerTests('Null')) {
  test(`${key} → ${expected}`, () => {
    expect(isNull(input)).toBe(expected);
  });
}
