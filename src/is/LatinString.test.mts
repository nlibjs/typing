import { listCheckerTests } from './tests.private.mjs';
import { isLatinString } from './LatinString.mjs';

for (const { key, input, expected } of listCheckerTests(
  'EmptyString',
  'NonEmptyString',
  'SmallLatin',
  'CapitalLatin',
  'HttpMethodGet',
  'HttpMethodOptions',
  'Localhost',
)) {
  test(`${key} → ${expected}`, () => {
    expect(isLatinString(input)).toBe(expected);
  });
}
