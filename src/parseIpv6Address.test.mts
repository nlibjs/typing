import { test } from 'node:test';
import * as assert from 'node:assert';
import type { Ipv6AddressParseResult } from './parseIpv6Address.mjs';
import { parseIpv6Address } from './parseIpv6Address.mjs';

const validTests: Array<
  [Parameters<typeof parseIpv6Address>, Ipv6AddressParseResult]
> = [
  [
    ['ABCD:EF01:2345:6789:ABCD:EF01:2345:6789'],
    {
      groups: [0xabcd, 0xef01, 0x2345, 0x6789, 0xabcd, 0xef01, 0x2345, 0x6789],
      start: 0,
      end: 39,
    },
  ],
  [
    ['0000:000:00:0:0:00:000:0000'],
    {
      groups: [0, 0, 0, 0, 0, 0, 0, 0],
      start: 0,
      end: 27,
    },
  ],
  [
    ['ff00::1'],
    {
      groups: [0xff00, 0, 0, 0, 0, 0, 0, 1],
      start: 0,
      end: 7,
    },
  ],
  [
    ['::1'],
    {
      groups: [0, 0, 0, 0, 0, 0, 0, 1],
      start: 0,
      end: 3,
    },
  ],
  [
    ['::'],
    {
      groups: [0, 0, 0, 0, 0, 0, 0, 0],
      start: 0,
      end: 2,
    },
  ],
  [
    ['2001:db8::aaaa:0:0:1'],
    {
      groups: [0x2001, 0xdb8, 0, 0, 0xaaaa, 0, 0, 1],
      start: 0,
      end: 20,
    },
  ],
  [
    ['2001:db8:0:0:aaaa::1'],
    {
      groups: [0x2001, 0xdb8, 0, 0, 0xaaaa, 0, 0, 1],
      start: 0,
      end: 20,
    },
  ],
  [
    [' 2001:db8:0:0:aaaa::1', 1],
    {
      groups: [0x2001, 0xdb8, 0, 0, 0xaaaa, 0, 0, 1],
      start: 1,
      end: 21,
    },
  ],
  [
    ['0:0:0:0:0:FFFF:129.144.52.38'],
    {
      groups: [0, 0, 0, 0, 0, 0xffff, 0x8190, 0x3426],
      start: 0,
      end: 28,
    },
  ],
];

for (const [input, expected] of validTests) {
  test(`${JSON.stringify(input)} → ${JSON.stringify(expected)}`, () => {
    assert.deepStrictEqual(parseIpv6Address(...input), expected);
  });
}

const invalidTests: Array<[Parameters<typeof parseIpv6Address>, RegExp]> = [
  [
    [' GBCD:EF01:2345:6789:ABCD:EF01:2345:6789 ', 1],
    /^Error: InvalidIpv6Address:/,
  ],
  [[' 2001:db8::aaaa::1 ', 1], /^Error: DuplicatedCompressor:/],
  [[' ABCD:EF01:2345:6789:ABCD:EF01:2345: ', 1], /^Error: InvalidIpv6Address:/],
];

for (const [input, expected] of invalidTests) {
  test(`${JSON.stringify(input)} → Error: ${expected}`, () => {
    assert.throws(() => parseIpv6Address(...input), expected);
  });
}
