import {listCheckerTests} from './tests.private';
import {isPositiveSafeInteger} from './PositiveSafeInteger';

for (const {key, input, expected} of listCheckerTests(
    'PositiveInteger',
    'HttpResponseStatusCodeOk',
    'HttpResponseStatusCodeNotFound',
)) {
    test(`${key} → ${expected}`, () => {
        expect(isPositiveSafeInteger(input)).toBe(expected);
    });
}
