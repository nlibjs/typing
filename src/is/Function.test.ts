import {listCheckerTests} from './tests.private';
import {isFunction} from './Function';

for (const {key, input, expected} of listCheckerTests('Function', 'Class')) {
    test(`${key} → ${expected}`, () => {
        expect(isFunction(input)).toBe(expected);
    });
}
