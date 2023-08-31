import { listCheckerTests } from './tests.private';
import { isDomainName } from './DomainName';

for (const { key, input, expected } of listCheckerTests(
  'ExampleDotCom',
  'DomainWithHyphenAndDigits',
  'DomainStartsWithDigits',
)) {
  test(`${key} → ${expected}`, () => {
    expect(isDomainName(input)).toBe(expected);
  });
}
