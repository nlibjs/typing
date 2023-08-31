import { listCheckerTests } from './tests.private.mjs';
import { isIpv4Address } from './Ipv4Address.mjs';

for (const { key, input, expected } of listCheckerTests('IPv4')) {
  test(`${key} → ${expected}`, () => {
    expect(isIpv4Address(input)).toBe(expected);
  });
}
