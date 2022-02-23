import {listCheckerTests} from './tests.private';
import {isSafeInteger} from './SafeInteger';

describe(isSafeInteger.name, () => {
    for (const {key, input, expected} of listCheckerTests('NegativeInteger', 'PositiveInteger', 'NegativeZero', 'Zero', 'PositiveZero')) {
        it(`${key} → ${expected}`, () => {
            expect(isSafeInteger(input)).toBe(expected);
        });
    }
});
