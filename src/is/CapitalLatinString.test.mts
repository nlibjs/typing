import {
  CapitalLatinCharacters,
  isCapitalLatinString,
} from './CapitalLatinString.mjs';
import { listCheckerTests } from './tests.private.mjs';

test('CapitalLatinCharacters', () => {
  expect(isCapitalLatinString(CapitalLatinCharacters)).toBe(true);
});

for (const { key, input, expected } of listCheckerTests(
  'EmptyString',
  'CapitalLatin',
  'HttpMethodGet',
  'HttpMethodOptions',
)) {
  test(`${key} → ${expected}`, () => {
    expect(isCapitalLatinString(input)).toBe(expected);
  });
}
