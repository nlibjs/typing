import {listCheckerTests} from './tests.private';
import {isPositiveSafeInteger} from './PositiveSafeInteger';

for (const {key, input, expected} of listCheckerTests('PositiveInteger')) {
    test(`${key} → ${expected}`, () => {
        expect(isPositiveSafeInteger(input)).toBe(expected);
    });
}
