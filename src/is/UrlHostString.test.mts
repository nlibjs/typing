import { test } from 'node:test';
import * as assert from 'node:assert';
import { listCheckerTests } from './tests.private.mjs';
import { isUrlHostString } from './UrlHostString.mjs';

for (const { key, input, expected } of listCheckerTests(
  'ExampleDotCom',
  'DomainWithHyphenAndDigits',
  'DomainStartsWithDigits',
  'HostWithPort',
  'IPv4',
  'HostIPv6',
  'HostIPv6WithPort',
)) {
  test(`${key} → ${expected}`, () => {
    assert.equal(isUrlHostString(input), expected);
  });
}
