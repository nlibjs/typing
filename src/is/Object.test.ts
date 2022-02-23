import {listCheckerTests} from './tests.private';
import {isObject} from './Object';

describe(isObject.name, () => {
    for (const {key, input, expected} of listCheckerTests('EmptyArray', 'Object', 'InvalidDate', 'ValidDate', 'Function', 'Class')) {
        it(`${key} → ${expected}`, () => {
            expect(isObject(input)).toBe(expected);
        });
    }
});
