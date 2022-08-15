import {listCheckerTests} from './tests.private';
import {isNonNegativeSafeInteger} from './NonNegativeSafeInteger';

for (const {key, input, expected} of listCheckerTests('NegativeZero', 'PositiveZero', 'Zero', 'PositiveInteger')) {
    test(`${key} → ${expected}`, () => {
        expect(isNonNegativeSafeInteger(input)).toBe(expected);
    });
}
