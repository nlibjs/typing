import {listCheckerTests} from './tests.private';
import {isPositiveFiniteNumber} from './PositiveFiniteNumber';

for (const {key, input, expected} of listCheckerTests(
    'PositiveInteger',
    'PositiveUnsafeInteger',
    'PositiveFloat',
    'HttpResponseStatusCodeOk',
    'HttpResponseStatusCodeNotFound',
)) {
    test(`${key} → ${expected}`, () => {
        expect(isPositiveFiniteNumber(input)).toBe(expected);
    });
}
