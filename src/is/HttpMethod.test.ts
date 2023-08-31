import { listCheckerTests } from './tests.private';
import { isHttpMethod } from './HttpMethod';

for (const { key, input, expected } of listCheckerTests(
  'HttpMethodGet',
  'HttpMethodOptions',
)) {
  test(`${key} → ${expected}`, () => {
    expect(isHttpMethod(input)).toBe(expected);
  });
}
