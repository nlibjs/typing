import {listCheckerTests} from './tests.private';
import {isHttpResponseStatusCode} from './HttpResponseStatusCode';

for (const {key, input, expected} of listCheckerTests('HttpResponseStatusCodeOk', 'HttpResponseStatusCodeNotFound')) {
    test(`${key} → ${expected}`, () => {
        expect(isHttpResponseStatusCode(input)).toBe(expected);
    });
}
