import {listCheckerTests} from './tests.private';
import {isNegativeFiniteNumber} from './NegativeFiniteNumber';

describe(isNegativeFiniteNumber.name, () => {
    for (const {key, input, expected} of listCheckerTests('NegativeInteger', 'NegativeUnsafeInteger', 'NegativeFloat')) {
        it(`${key} → ${expected}`, () => {
            expect(isNegativeFiniteNumber(input)).toBe(expected);
        });
    }
});
