import {listCheckerTests} from './tests.private';
import {isLatinString} from './LatinString';

for (const {key, input, expected} of listCheckerTests(
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
