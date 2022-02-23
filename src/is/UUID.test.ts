import {listCheckerTests} from './tests.private';
import {isUUID} from './UUID';

describe(isUUID.name, () => {
    for (const {key, input, expected} of listCheckerTests('UUID')) {
        it(`${key} → ${expected}`, () => {
            expect(isUUID(input)).toBe(expected);
        });
    }
});
