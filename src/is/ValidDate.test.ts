import {listCheckerTests} from './tests.private';
import {isValidDate} from './ValidDate';

for (const {key, input, expected} of listCheckerTests('ValidDate')) {
    test(`${key} → ${expected}`, () => {
        expect(isValidDate(input)).toBe(expected);
    });
}
