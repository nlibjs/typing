import {CapitalLatinCharacters, isCapitalLatinString} from './CapitalLatinString';
import {listCheckerTests} from './tests.private';

test('CapitalLatinCharacters', () => {
    expect(isCapitalLatinString(CapitalLatinCharacters)).toBe(true);
});

for (const {key, input, expected} of listCheckerTests('EmptyString', 'CapitalLatin', 'HttpMethodGet', 'HttpMethodOptions')) {
    test(`${key} → ${expected}`, () => {
        expect(isCapitalLatinString(input)).toBe(expected);
    });
}
