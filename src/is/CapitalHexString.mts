import { createTypeChecker } from '../createTypeChecker.mjs';
import type { Nominal } from '../generics.mjs';

export type CapitalHexString = Nominal<string, 'CapitalHexString'>;
export const isCapitalHexString = createTypeChecker<
  CapitalHexString,
  'CapitalHexString'
>('CapitalHexString', /^[0-9A-F]*$/);
