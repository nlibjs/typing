import {listCheckerTests} from './tests.private';
import {isUndefined} from './Undefined';

describe(isUndefined.name, () => {
    for (const {key, input, expected} of listCheckerTests('Undefined')) {
        it(`${key} → ${expected}`, () => {
            expect(isUndefined(input)).toBe(expected);
        });
    }
});
