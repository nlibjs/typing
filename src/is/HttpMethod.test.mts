import { listCheckerTests } from './tests.private.mjs';
import { isHttpMethod } from './HttpMethod.mjs';

for (const { key, input, expected } of listCheckerTests(
  'HttpMethodGet',
  'HttpMethodOptions',
)) {
  test(`${key} → ${expected}`, () => {
    expect(isHttpMethod(input)).toBe(expected);
  });
}
