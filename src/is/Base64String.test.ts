import {listCheckerTests} from './tests.private';
import {isBase64String} from './Base64String';

describe(isBase64String.name, () => {
    for (const {key, input, expected} of listCheckerTests(
        'Base64',
        'CapitalLatin',
        'SmallLatin',
        'Digits65',
        'Digits64',
        'Localhost',
        'NonEmptyString',
    )) {
        it(`${key} → ${expected}`, () => {
            expect(isBase64String(input)).toBe(expected);
        });
    }
});
