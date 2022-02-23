import {listCheckerTests} from './tests.private';
import {isArray} from './Array';

describe(isArray.name, () => {
    for (const {key, input, expected} of listCheckerTests('EmptyArray')) {
        it(`${key} → ${expected}`, () => {
            expect(isArray(input)).toBe(expected);
        });
    }
});
