import {listCheckerTests} from './tests.private';
import {isHttpsUrlString} from './HttpsUrlString';

describe(isHttpsUrlString.name, () => {
    for (const {key, input, expected} of listCheckerTests('HttpsUrl', 'HttpsUrlWithPort')) {
        it(`${key} → ${expected}`, () => {
            expect(isHttpsUrlString(input)).toBe(expected);
        });
    }
});
