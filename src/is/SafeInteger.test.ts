import {listCheckerTests} from './tests.private';
import {isSafeInteger} from './SafeInteger';

for (const {key, input, expected} of listCheckerTests(
    'NegativeInteger',
    'PositiveInteger',
    'NegativeZero',
    'Zero',
    'PositiveZero',
    'HttpResponseStatusCodeOk',
    'HttpResponseStatusCodeNotFound',
)) {
    test(`${key} → ${expected}`, () => {
        expect(isSafeInteger(input)).toBe(expected);
    });
}
