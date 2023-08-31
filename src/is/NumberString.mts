import { createTypeChecker } from '../createTypeChecker.mjs';
import type { Nominal } from '../generics.mjs';

export const NumericCharacters = '0123456789';
export type NumberString = Nominal<string, 'NumberString'>;
export const isNumberString = createTypeChecker<NumberString, 'NumberString'>(
  'NumberString',
  new RegExp(`^[${NumericCharacters}]*$`),
);
