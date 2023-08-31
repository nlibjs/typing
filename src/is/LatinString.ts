import { createTypeChecker } from '../createTypeChecker';
import type { Nominal } from '../generics';
import { CapitalLatinCharacters } from './CapitalLatinString';
import { SmallLatinCharacters } from './SmallLatinString';

export const LatinCharacters = `${SmallLatinCharacters}${CapitalLatinCharacters}`;
export type LatinString = Nominal<string, 'LatinString'>;
export const isLatinString = createTypeChecker<LatinString, 'LatinString'>(
  'LatinString',
  new RegExp(`^[${LatinCharacters}]*$`),
);
