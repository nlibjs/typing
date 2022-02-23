import {listCheckerTests} from './tests.private';
import {isNegativeSafeInteger} from './NegativeSafeInteger';

describe(isNegativeSafeInteger.name, () => {
    for (const {key, input, expected} of listCheckerTests('NegativeInteger')) {
        it(`${key} → ${expected}`, () => {
            expect(isNegativeSafeInteger(input)).toBe(expected);
        });
    }
});
