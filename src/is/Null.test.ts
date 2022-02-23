import {listCheckerTests} from './tests.private';
import {isNull} from './Null';

describe(isNull.name, () => {
    for (const {key, input, expected} of listCheckerTests('Null')) {
        it(`${key} → ${expected}`, () => {
            expect(isNull(input)).toBe(expected);
        });
    }
});
