import {listCheckerTests} from './tests.private';
import {isPositiveFiniteNumber} from './PositiveFiniteNumber';

for (const {key, input, expected} of listCheckerTests('PositiveInteger', 'PositiveUnsafeInteger', 'PositiveFloat')) {
    test(`${key} → ${expected}`, () => {
        expect(isPositiveFiniteNumber(input)).toBe(expected);
    });
}
