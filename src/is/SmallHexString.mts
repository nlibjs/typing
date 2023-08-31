import { createTypeChecker } from '../createTypeChecker.mjs';
import type { Nominal } from '../generics.mjs';

export type SmallHexString = Nominal<string, 'SmallHexString'>;
export const isSmallHexString = createTypeChecker<
  SmallHexString,
  'SmallHexString'
>('SmallHexString', /^[0-9a-f]*$/);
