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
    )) {
        it(`${key} → ${expected}`, () => {
            expect(isString(input)).toBe(expected);
        });
    }
});
