import {listCheckerTests} from './tests.private';
import {isNonNegativeFiniteNumber} from './NonNegativeFiniteNumber';

for (const {key, input, expected} of listCheckerTests(
    'NegativeZero',
    'PositiveZero',
    'Zero',
    'PositiveInteger',
    'PositiveFloat',
    'PositiveUnsafeInteger',
)) {
    test(`${key} → ${expected}`, () => {
        expect(isNonNegativeFiniteNumber(input)).toBe(expected);
    });
}
