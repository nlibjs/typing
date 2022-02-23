import {listCheckerTests} from './tests.private';
import {isFunction} from './Function';

describe(isFunction.name, () => {
    for (const {key, input, expected} of listCheckerTests('Function', 'Class')) {
        it(`${key} → ${expected}`, () => {
            expect(isFunction(input)).toBe(expected);
        });
    }
});
