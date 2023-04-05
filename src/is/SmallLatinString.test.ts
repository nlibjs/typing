import {listCheckerTests} from './tests.private';
import {isSmallLatinString} from './SmallLatinString';

for (const {key, input, expected} of listCheckerTests('EmptyString', 'NonEmptyString', 'SmallLatin', 'Localhost')) {
    test(`${key} → ${expected}`, () => {
        expect(isSmallLatinString(input)).toBe(expected);
    });
}
