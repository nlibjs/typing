import {listCheckerTests} from './tests.private';
import {isPositiveFiniteNumber} from './PositiveFiniteNumber';

describe(isPositiveFiniteNumber.name, () => {
    for (const {key, input, expected} of listCheckerTests('PositiveInteger', 'PositiveUnsafeInteger', 'PositiveFloat')) {
        it(`${key} → ${expected}`, () => {
            expect(isPositiveFiniteNumber(input)).toBe(expected);
        });
    }
});
