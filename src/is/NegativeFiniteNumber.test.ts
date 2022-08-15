import {listCheckerTests} from './tests.private';
import {isNegativeFiniteNumber} from './NegativeFiniteNumber';

for (const {key, input, expected} of listCheckerTests('NegativeInteger', 'NegativeUnsafeInteger', 'NegativeFloat')) {
    test(`${key} → ${expected}`, () => {
        expect(isNegativeFiniteNumber(input)).toBe(expected);
    });
}
