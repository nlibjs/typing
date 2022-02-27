import {createTypeChecker} from '../createTypeChecker';
import type {Nominal} from '../generics';
import {parseIpv6Address} from '../parseIpv6Address';
import {isString} from './String';

export type Ipv6Address = Nominal<string, 'Ipv6Address'>;

export const isIpv6Address = createTypeChecker(
    'Ipv6Address',
    (input: unknown): input is Ipv6Address => {
        if (isString(input)) {
            try {
                const result = parseIpv6Address(input);
                return result.end === input.length;
            } catch {
                // do nothing
            }
        }
        return false;
    },
);
