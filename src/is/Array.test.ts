import {listCheckerTests} from './tests.private';
import {isArray} from './Array';

for (const {key, input, expected} of listCheckerTests('EmptyArray')) {
    test(`${key} → ${expected}`, () => {
        expect(isArray(input)).toBe(expected);
    });
}
