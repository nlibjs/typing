import { listCheckerTests } from './tests.private';
import { isUndefined } from './Undefined';

for (const { key, input, expected } of listCheckerTests('Undefined')) {
  test(`${key} → ${expected}`, () => {
    expect(isUndefined(input)).toBe(expected);
  });
}
