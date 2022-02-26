import {listCheckerTests} from './tests.private';
import {isEmailAddress} from './EmailAddress';

describe(isEmailAddress.name, () => {
    for (const {key, input, expected} of listCheckerTests(
        'EmailAddress1LocalPart',
        'EmailAddressLong64',
        'EmailAddressSymbols',
    )) {
        it(`${key} → ${expected}`, () => {
            expect(isEmailAddress(input)).toBe(expected);
        });
    }
});
