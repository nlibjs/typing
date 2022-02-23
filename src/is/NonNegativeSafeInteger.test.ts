import {listCheckerTests} from './tests.private';
import {isNonNegativeSafeInteger} from './NonNegativeSafeInteger';

describe(isNonNegativeSafeInteger.name, () => {
    for (const {key, input, expected} of listCheckerTests('NegativeZero', 'PositiveZero', 'Zero', 'PositiveInteger')) {
        it(`${key} → ${expected}`, () => {
            expect(isNonNegativeSafeInteger(input)).toBe(expected);
        });
    }
});
