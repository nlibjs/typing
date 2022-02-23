import {listCheckerTests} from './tests.private';
import {isString} from './String';

describe(isString.name, () => {
    for (const {key, input, expected} of listCheckerTests('EmptyString', 'NonEmptyString', 'UUID', 'NonUUID')) {
        it(`${key} → ${expected}`, () => {
            expect(isString(input)).toBe(expected);
        });
    }
});
