import {listCheckerTests} from './tests.private';
import {isNegativeSafeInteger} from './NegativeSafeInteger';

for (const {key, input, expected} of listCheckerTests('NegativeInteger')) {
    test(`${key} → ${expected}`, () => {
        expect(isNegativeSafeInteger(input)).toBe(expected);
    });
}
