import {listCheckerTests} from './tests.private';
import {isBase64UrlString} from './Base64UrlString';

describe(isBase64UrlString.name, () => {
    for (const {key, input, expected} of listCheckerTests(
        'Base64Url',
        'CapitalLatin',
        'SmallLatin',
        'Digits65',
        'Digits64',
        'Localhost',
        'NonEmptyString',
        'UUID',
        'NonUUID',
    )) {
        it(`${key} → ${expected}`, () => {
            expect(isBase64UrlString(input)).toBe(expected);
        });
    }
});
