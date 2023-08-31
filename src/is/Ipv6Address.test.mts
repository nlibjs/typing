import { listCheckerTests } from './tests.private.mjs';
import { isIpv6Address } from './Ipv6Address.mjs';

for (const { key, input, expected } of listCheckerTests('IPv6')) {
  test(`${key} → ${expected}`, () => {
    expect(isIpv6Address(input)).toBe(expected);
  });
}
