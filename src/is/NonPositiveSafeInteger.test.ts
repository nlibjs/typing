import {listCheckerTests} from './tests.private';
import {isNonPositiveSafeInteger} from './NonPositiveSafeInteger';

describe(isNonPositiveSafeInteger.name, () => {
    for (const {key, input, expected} of listCheckerTests('NegativeZero', 'PositiveZero', 'Zero', 'NegativeInteger')) {
        it(`${key} → ${expected}`, () => {
            expect(isNonPositiveSafeInteger(input)).toBe(expected);
        });
    }
});
