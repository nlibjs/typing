import { listCheckerTests } from './tests.private.mjs';
import { isHttpsUrlString } from './HttpsUrlString.mjs';

for (const { key, input, expected } of listCheckerTests(
  'HttpsUrl',
  'HttpsUrlWithPort',
)) {
  test(`${key} → ${expected}`, () => {
    expect(isHttpsUrlString(input)).toBe(expected);
  });
}
