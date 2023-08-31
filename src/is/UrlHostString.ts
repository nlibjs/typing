import { createTypeChecker } from '../createTypeChecker';
import type { Nominal } from '../generics';
import { isDomainName } from './DomainName';
import { isIpv4Address } from './Ipv4Address';
import { isIpv6Address } from './Ipv6Address';
import { isString } from './String';

export type UrlHostString = Nominal<string, 'UrlHostString'>;

export const isUrlHostString = createTypeChecker(
  'Domain',
  (input: unknown): input is UrlHostString => {
    if (!isString(input)) {
      return false;
    }
    if (input.startsWith('[')) {
      const closeIndex = input.indexOf(']');
      if (closeIndex < 0 || !isIpv6Address(input.slice(1, closeIndex))) {
        return false;
      }
      const remainder = input.slice(closeIndex + 1);
      return !remainder || /^:\d+$/.test(remainder);
    }
    let colonIndex = input.indexOf(':');
    if (colonIndex < 0) {
      colonIndex = input.length;
    } else {
      const remainder = input.slice(colonIndex);
      if (!/^:\d+$/.test(remainder)) {
        return false;
      }
    }
    const hostname = input.slice(0, colonIndex);
    return isDomainName(hostname) || isIpv4Address(hostname);
  },
);
