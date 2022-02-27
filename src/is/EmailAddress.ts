import {createTypeChecker} from '../createTypeChecker';
import type {Nominal} from '../generics';
import {isDomainName} from './DomainName';
import {isEmailAddressLocalPart} from './EmailAddressLocalPart';
import {isString} from './String';

export type EmailAddress = Nominal<string, 'EmailAddress'>;

export const isEmailAddress = createTypeChecker(
    'EmailAddress',
    (input: unknown): input is EmailAddress => {
        if (!isString(input)) {
            return false;
        }
        if (254 < input.length) {
            return false;
        }
        const atMarkIndex = input.lastIndexOf('@');
        if (atMarkIndex < 1) {
            return false;
        }
        return isEmailAddressLocalPart(input.slice(0, atMarkIndex)) && isDomainName(input.slice(atMarkIndex + 1));
    },
);
