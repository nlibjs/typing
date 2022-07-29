import {listCheckerTests} from './tests.private';
import {isUrlHostString} from './UrlHostString';

describe(isUrlHostString.name, () => {
    for (const {key, input, expected} of listCheckerTests(
        'ExampleDotCom',
        'DomainWithHyphenAndDigits',
        'DomainStartsWithDigits',
        'HostWithPort',
        'IPv4',
        'HostIPv6',
        'HostIPv6WithPort',
    )) {
        it(`${key} → ${expected}`, () => {
            expect(isUrlHostString(input)).toBe(expected);
        });
    }
});
