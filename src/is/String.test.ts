import {listCheckerTests} from './tests.private';
import {isString} from './String';

describe(isString.name, () => {
    for (const {key, input, expected} of listCheckerTests(
        'EmptyString',
        'NonEmptyString',
        'UUID',
        'NonUUID',
        'Localhost',
        'ExampleDotCom',
        'DomainWithHyphenAndDigits',
        'DomainStartsWithDigits',
        'InvalidDomainEndsWithHyphen',
        'InvalidDomainStartsWithDot',
        'InvalidDomainEndsWithDot',
        'Digits64',
        'Digits65',
        'DigitsSeparatedByDot',
        'DigitsSeparatedBy2Dots',
        'EmailAddressLocalPartSymbols',
        'SmallLatin',
        'CapitalLatin',
        'QuotedSingle',
        'QuotedDouble',
        'EmailAddressNoLocalPart',
        'EmailAddress1LocalPart',
        'EmailAddressLong64',
        'EmailAddressLong65',
        'EmailAddressSymbols',
        'IPv4',
        'IPv6',
        'InvalidIPv4',
        'InvalidIPv6',
    )) {
        it(`${key} → ${expected}`, () => {
            expect(isString(input)).toBe(expected);
        });
    }
});
