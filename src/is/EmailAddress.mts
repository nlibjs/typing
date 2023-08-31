import { createTypeChecker } from '../createTypeChecker.mjs';
import type { Nominal } from '../generics.mjs';
import { isDomainName } from './DomainName.mjs';
import { isEmailAddressLocalPart } from './EmailAddressLocalPart.mjs';
import { isString } from './String.mjs';

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
    return (
      isEmailAddressLocalPart(input.slice(0, atMarkIndex)) &&
      isDomainName(input.slice(atMarkIndex + 1))
    );
  },
);
