import { createTypeChecker } from '../createTypeChecker.mjs';
import type { Nominal } from '../generics.mjs';

export const CapitalLatinCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export type CapitalLatinString = Nominal<string, 'CapitalLatinString'>;
export const isCapitalLatinString = createTypeChecker<
  CapitalLatinString,
  'CapitalLatinString'
>('CapitalLatinString', new RegExp(`^[${CapitalLatinCharacters}]*$`));
