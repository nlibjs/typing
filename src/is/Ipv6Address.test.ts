import {listCheckerTests} from './tests.private';
import {isIpv6Address} from './Ipv6Address';

for (const {key, input, expected} of listCheckerTests('IPv6')) {
    test(`${key} → ${expected}`, () => {
        expect(isIpv6Address(input)).toBe(expected);
    });
}
