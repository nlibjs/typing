import {createTypeChecker} from '../createTypeChecker';
import type {Nominal} from '../generics';
import {isDomainName} from './DomainName';
import {isString} from './String';

export type HttpsUrlString = Nominal<string, 'HttpsUrlString'>;
export const isHttpsUrlString = createTypeChecker<HttpsUrlString>(
    'HttpsUrlString',
    (input: unknown): input is HttpsUrlString => {
        if (isString(input) && input.startsWith('https://')) {
            let domainPartEnd = input.indexOf('/', 8);
            if (domainPartEnd < 0) {
                domainPartEnd = input.length;
            }
            if (!isDomainName(input.slice(8, domainPartEnd))) {
                return false;
            }
            return !input.slice(domainPartEnd).includes(' ');
        }
        return false;
    },
);
