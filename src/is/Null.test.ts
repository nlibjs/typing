import {listCheckerTests} from './tests.private';
import {isNull} from './Null';

for (const {key, input, expected} of listCheckerTests('Null')) {
    test(`${key} → ${expected}`, () => {
        expect(isNull(input)).toBe(expected);
    });
}
