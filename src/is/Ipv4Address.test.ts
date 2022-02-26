import {listCheckerTests} from './tests.private';
import {isIpv4Address} from './Ipv4Address';

describe(isIpv4Address.name, () => {
    for (const {key, input, expected} of listCheckerTests('IPv4')) {
        it(`${key} → ${expected}`, () => {
            expect(isIpv4Address(input)).toBe(expected);
        });
    }
});
