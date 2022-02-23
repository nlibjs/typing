import {listCheckerTests} from './tests.private';
import {isValidDate} from './ValidDate';

describe(isValidDate.name, () => {
    for (const {key, input, expected} of listCheckerTests('ValidDate')) {
        it(`${key} → ${expected}`, () => {
            expect(isValidDate(input)).toBe(expected);
        });
    }
});
