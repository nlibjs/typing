import {listCheckerTests} from './tests.private';
import {isCapitalLatinString} from './CapitalLatinString';

for (const {key, input, expected} of listCheckerTests('EmptyString', 'CapitalLatin', 'HttpMethodGet', 'HttpMethodOptions')) {
    test(`${key} → ${expected}`, () => {
        expect(isCapitalLatinString(input)).toBe(expected);
    });
}
