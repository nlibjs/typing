import type { Ipv4AddressParseResult } from './parseIpv4Address.mjs';
import { parseIpv4Address } from './parseIpv4Address.mjs';

const validTests: Array<
  [Parameters<typeof parseIpv4Address>, Ipv4AddressParseResult]
> = [
  [['0.0.0.0'], { octets: [0, 0, 0, 0], start: 0, end: 7 }],
  [
    [' 255.255.255.255 ', 1],
    { octets: [255, 255, 255, 255], start: 1, end: 16 },
  ],
];

for (const [input, expected] of validTests) {
  test(`${JSON.stringify(input)} → ${JSON.stringify(expected)}`, () => {
    expect(parseIpv4Address(...input)).toMatchObject(expected);
  });
}

const invalidTests: Array<[Parameters<typeof parseIpv4Address>, RegExp]> = [
  [[' 255.255.255.256 ', 1], /^InvalidIpv4Octet:/],
  [[' 255.255.255.1255 ', 1], /^InvalidIpv4Octet:/],
  [[' 255.255.255.00 ', 1], /^InvalidIpv4Octet:/],
  [[' 255.255.255 ', 1], /^InvalidIpv4Address:/],
  [[' 255.255.255. ', 1], /^InvalidIpv4Address:/],
  [[' 255.255.255.255 ', 0], /^InvalidIpv4Address:/],
];

for (const [input, expected] of invalidTests) {
  test(`${JSON.stringify(input)} → Error: ${expected}`, () => {
    expect(() => parseIpv4Address(...input)).toThrowError(expected);
  });
}
