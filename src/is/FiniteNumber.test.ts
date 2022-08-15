import {listCheckerTests} from './tests.private';
import {isFiniteNumber} from './FiniteNumber';

for (const {key, input, expected} of listCheckerTests('NegativeUnsafeInteger', 'NegativeFloat', 'NegativeInteger', 'NegativeZero', 'Zero', 'PositiveZero', 'PositiveInteger', 'PositiveFloat', 'PositiveUnsafeInteger')) {
    test(`${key} → ${expected}`, () => {
        expect(isFiniteNumber(input)).toBe(expected);
    });
}
