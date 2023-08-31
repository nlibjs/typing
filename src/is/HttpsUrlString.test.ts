import { listCheckerTests } from './tests.private';
import { isHttpsUrlString } from './HttpsUrlString';

for (const { key, input, expected } of listCheckerTests(
  'HttpsUrl',
  'HttpsUrlWithPort',
)) {
  test(`${key} → ${expected}`, () => {
    expect(isHttpsUrlString(input)).toBe(expected);
  });
}
