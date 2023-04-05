import {listCheckerTests} from './tests.private';
import {isEmailAddressLocalPart} from './EmailAddressLocalPart';

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
    'Base64',
    'Base64Url',
    'HttpMethodGet',
    'HttpMethodOptions',
    'Hex',
    'SmallHex',
    'CapitalHex',
)) {
    test(`${key} → ${expected}`, () => {
        expect(isEmailAddressLocalPart(input)).toBe(expected);
    });
}
