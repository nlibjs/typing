import {listCheckerTests} from './tests.private';
import {isIpv6Address} from './Ipv6Address';

describe(isIpv6Address.name, () => {
    for (const {key, input, expected} of listCheckerTests('IPv6')) {
        it(`${key} → ${expected}`, () => {
            expect(isIpv6Address(input)).toBe(expected);
        });
    }
});
