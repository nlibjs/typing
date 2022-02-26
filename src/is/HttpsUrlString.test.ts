import {listCheckerTests} from './tests.private';
import {isHttpsUrlString} from './HttpsUrlString';

describe(isHttpsUrlString.name, () => {
    for (const {key, input, expected} of listCheckerTests('HttpsUrl')) {
        it(`${key} → ${expected}`, () => {
            expect(isHttpsUrlString(input)).toBe(expected);
        });
    }
});
