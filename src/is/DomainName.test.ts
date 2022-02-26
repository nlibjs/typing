import {listCheckerTests} from './tests.private';
import {isDomainName} from './DomainName';

describe(isDomainName.name, () => {
    for (const {key, input, expected} of listCheckerTests(
        'ExampleDotCom',
        'DomainWithHyphenAndDigits',
        'DomainStartsWithDigits',
    )) {
        it(`${key} → ${expected}`, () => {
            expect(isDomainName(input)).toBe(expected);
        });
    }
});
