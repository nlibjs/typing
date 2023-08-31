import { createTypeChecker } from '../createTypeChecker.mjs';
import type { Nominal } from '../generics.mjs';
import { parseIpv4Address } from '../parseIpv4Address.mjs';
import { isString } from './String.mjs';

export type Ipv4Address = Nominal<string, 'Ipv4Address'>;

export const isIpv4Address = createTypeChecker(
  'Ipv4Address',
  (input: unknown): input is Ipv4Address => {
    if (isString(input)) {
      try {
        const result = parseIpv4Address(input);
        return result.end === input.length;
      } catch {
        // do nothing
      }
    }
    return false;
  },
);
