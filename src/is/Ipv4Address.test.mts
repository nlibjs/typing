import { test } from 'node:test';
import * as assert from 'node:assert';
import { listCheckerTests } from './tests.private.mjs';
import { isIpv4Address } from './Ipv4Address.mjs';

for (const { key, input, expected } of listCheckerTests('IPv4')) {
  test(`${key} → ${expected}`, () => {
    assert.equal(isIpv4Address(input), expected);
  });
}
