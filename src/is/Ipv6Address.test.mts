import { test } from 'node:test';
import * as assert from 'node:assert';
import { listCheckerTests } from './tests.private.mjs';
import { isIpv6Address } from './Ipv6Address.mjs';

for (const { key, input, expected } of listCheckerTests('IPv6')) {
  test(`${key} → ${expected}`, () => {
    assert.equal(isIpv6Address(input), expected);
  });
}
