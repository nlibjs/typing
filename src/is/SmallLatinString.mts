import { createTypeChecker } from '../createTypeChecker.mjs';
import type { Nominal } from '../generics.mjs';

export const SmallLatinCharacters = 'abcdefghijklmnopqrstuvwxyz';
export type SmallLatinString = Nominal<string, 'SmallLatinString'>;
export const isSmallLatinString = createTypeChecker<
  SmallLatinString,
  'SmallLatinString'
>('SmallLatinString', /^[a-z]*$/);
