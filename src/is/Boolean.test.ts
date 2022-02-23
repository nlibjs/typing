import {listCheckerTests} from './tests.private';
import {isBoolean} from './Boolean';

describe(isBoolean.name, () => {
    for (const {key, input, expected} of listCheckerTests('True', 'False')) {
        it(`${key} → ${expected}`, () => {
            expect(isBoolean(input)).toBe(expected);
        });
    }
});
