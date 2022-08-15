import {listCheckerTests} from './tests.private';
import {isEmailAddress} from './EmailAddress';

for (const {key, input, expected} of listCheckerTests(
    'EmailAddress1LocalPart',
    'EmailAddressLong64',
    'EmailAddressSymbols',
)) {
    test(`${key} → ${expected}`, () => {
        expect(isEmailAddress(input)).toBe(expected);
    });
}
