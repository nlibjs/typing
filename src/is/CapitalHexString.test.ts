import {isCapitalHexString} from './CapitalHexString';
import {listCheckerTests} from './tests.private';

for (const {key, input, expected} of listCheckerTests('EmptyString', 'Digits65', 'Digits64', 'CapitalHex')) {
    test(`${key} → ${expected}`, () => {
        expect(isCapitalHexString(input)).toBe(expected);
    });
}
