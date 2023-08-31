import { listCheckerTests } from './tests.private.mjs';
import { isHttpResponseStatusCode } from './HttpResponseStatusCode.mjs';

for (const { key, input, expected } of listCheckerTests(
  'HttpResponseStatusCodeOk',
  'HttpResponseStatusCodeNotFound',
)) {
  test(`${key} → ${expected}`, () => {
    expect(isHttpResponseStatusCode(input)).toBe(expected);
  });
}
