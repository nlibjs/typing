import {listCheckerTests} from './tests.private';
import {isPositiveSafeInteger} from './PositiveSafeInteger';

describe(isPositiveSafeInteger.name, () => {
    for (const {key, input, expected} of listCheckerTests('PositiveInteger')) {
        it(`${key} → ${expected}`, () => {
            expect(isPositiveSafeInteger(input)).toBe(expected);
        });
    }
});
