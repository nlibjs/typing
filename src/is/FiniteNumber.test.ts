import {listCheckerTests} from './tests.private';
import {isFiniteNumber} from './FiniteNumber';

describe(isFiniteNumber.name, () => {
    for (const {key, input, expected} of listCheckerTests('NegativeUnsafeInteger', 'NegativeFloat', 'NegativeInteger', 'NegativeZero', 'Zero', 'PositiveZero', 'PositiveInteger', 'PositiveFloat', 'PositiveUnsafeInteger')) {
        it(`${key} → ${expected}`, () => {
            expect(isFiniteNumber(input)).toBe(expected);
        });
    }
});
