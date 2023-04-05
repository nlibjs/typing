import {listCheckerTests} from './tests.private';
import {isCapitalHexString} from './CapitalHexString';

for (const {key, input, expected} of listCheckerTests('EmptyString', 'Digits65', 'Digits64', 'CapitalHex')) {
    test(`${key} → ${expected}`, () => {
        expect(isCapitalHexString(input)).toBe(expected);
    });
}
