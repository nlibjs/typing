import { createTypeChecker } from '../createTypeChecker';
import type { Nominal } from '../generics';
import { isString } from './String';
import { isUrlHostString } from './UrlHostString';

export type HttpsUrlString = Nominal<string, 'HttpsUrlString'>;
export const isHttpsUrlString = createTypeChecker(
  'HttpsUrlString',
  (input: unknown): input is HttpsUrlString => {
    if (isString(input) && input.startsWith('https://')) {
      let domainPartEnd = input.indexOf('/', 8);
      if (domainPartEnd < 0) {
        domainPartEnd = input.length;
      }
      if (!isUrlHostString(input.slice(8, domainPartEnd))) {
        return false;
      }
      return !input.slice(domainPartEnd).includes(' ');
    }
    return false;
  },
);
