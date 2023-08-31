import { listCheckerTests } from './tests.private.mjs';
import { isDomainName } from './DomainName.mjs';

for (const { key, input, expected } of listCheckerTests(
  'ExampleDotCom',
  'DomainWithHyphenAndDigits',
  'DomainStartsWithDigits',
)) {
  test(`${key} → ${expected}`, () => {
    expect(isDomainName(input)).toBe(expected);
  });
}
