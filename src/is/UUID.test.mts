import { listCheckerTests } from './tests.private.mjs';
import { isUUID } from './UUID.mjs';

for (const { key, input, expected } of listCheckerTests('UUID')) {
  test(`${key} → ${expected}`, () => {
    expect(isUUID(input)).toBe(expected);
  });
}
