import { createTypeChecker } from '../createTypeChecker';
import type { Nominal } from '../generics';
import { parseIpv4Address } from '../parseIpv4Address';
import { isString } from './String';

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
