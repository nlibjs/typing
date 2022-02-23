import {listCheckerTests} from './tests.private';
import {isNonNegativeFiniteNumber} from './NonNegativeFiniteNumber';

describe(isNonNegativeFiniteNumber.name, () => {
    for (const {key, input, expected} of listCheckerTests('NegativeZero', 'PositiveZero', 'Zero', 'PositiveInteger', 'PositiveFloat', 'PositiveUnsafeInteger')) {
        it(`${key} → ${expected}`, () => {
            expect(isNonNegativeFiniteNumber(input)).toBe(expected);
        });
    }
});
