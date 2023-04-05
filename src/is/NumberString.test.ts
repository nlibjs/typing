import {listCheckerTests} from './tests.private';
import {isNumberString} from './NumberString';

for (const {key, input, expected} of listCheckerTests('EmptyString', 'Digits65', 'Digits64')) {
    test(`${key} → ${expected}`, () => {
        expect(isNumberString(input)).toBe(expected);
    });
}
