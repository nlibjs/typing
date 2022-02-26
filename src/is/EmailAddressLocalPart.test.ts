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
        'Digits64',
        'DigitsSeparatedByDot',
        'EmailAddressLocalPartSymbols',
        'SmallLatin',
        'CapitalLatin',
        'QuotedSingle',
        'IPv4',
        'InvalidIPv4',
    )) {
        it(`${key} → ${expected}`, () => {
            expect(isEmailAddressLocalPart(input)).toBe(expected);
        });
    }
});
