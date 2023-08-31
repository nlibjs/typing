import { listCheckerTests } from './tests.private';
import { isSmallLatinString, SmallLatinCharacters } from './SmallLatinString';

test('SmallLatinCharacters', () => {
  expect(isSmallLatinString(SmallLatinCharacters)).toBe(true);
});

for (const { key, input, expected } of listCheckerTests(
  'EmptyString',
  'NonEmptyString',
  'SmallLatin',
  'Localhost',
)) {
  test(`${key} → ${expected}`, () => {
    expect(isSmallLatinString(input)).toBe(expected);
  });
}
