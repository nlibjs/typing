import {listCheckerTests} from './tests.private';
import {isEmailAddressLocalPart} from './EmailAddressLocalPart';

describe(isEmailAddressLocalPart.name, () => {
    for (const {key, input, expected} of listCheckerTests(
        'NonEmptyString',
        'UUID',
        'NonUUID',
        'Localhost',
        'ExampleDotCom',
        'DomainWithHyphenAndDigits',
        'DomainStartsWithDigits',
        'InvalidDomainEndsWithHyphen',
        'IPv4',
        'Digits64',
        'DigitsSeparatedByDot',
        'EmailAddressLocalPartSymbols',
        'SmallLatin',
        'CapitalLatin',
        'QuotedSingle',
    )) {
        it(`${key} → ${expected}`, () => {
            expect(isEmailAddressLocalPart(input)).toBe(expected);
        });
    }
});
