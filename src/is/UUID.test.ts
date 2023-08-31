import { listCheckerTests } from './tests.private';
import { isUUID } from './UUID';

for (const { key, input, expected } of listCheckerTests('UUID')) {
  test(`${key} → ${expected}`, () => {
    expect(isUUID(input)).toBe(expected);
  });
}
