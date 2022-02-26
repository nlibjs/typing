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
        'IPv4',
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
    )) {
        it(`${key} → ${expected}`, () => {
            expect(isString(input)).toBe(expected);
        });
    }
});
