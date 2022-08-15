import {listCheckerTests} from './tests.private';
import {isBoolean} from './Boolean';

for (const {key, input, expected} of listCheckerTests('True', 'False')) {
    test(`${key} → ${expected}`, () => {
        expect(isBoolean(input)).toBe(expected);
    });
}
