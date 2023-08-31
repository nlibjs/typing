import { createTypeChecker } from '../createTypeChecker';
import type { Nominal } from '../generics';

export const CapitalLatinCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export type CapitalLatinString = Nominal<string, 'CapitalLatinString'>;
export const isCapitalLatinString = createTypeChecker<
  CapitalLatinString,
  'CapitalLatinString'
>('CapitalLatinString', new RegExp(`^[${CapitalLatinCharacters}]*$`));
