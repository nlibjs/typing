import {listCheckerTests} from './tests.private';
import {isNonPositiveFiniteNumber} from './NonPositiveFiniteNumber';

describe(isNonPositiveFiniteNumber.name, () => {
    for (const {key, input, expected} of listCheckerTests('NegativeZero', 'PositiveZero', 'Zero', 'NegativeInteger', 'NegativeFloat', 'NegativeUnsafeInteger')) {
        it(`${key} → ${expected}`, () => {
            expect(isNonPositiveFiniteNumber(input)).toBe(expected);
        });
    }
});
