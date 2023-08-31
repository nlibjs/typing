import { createTypeChecker } from '../createTypeChecker';
import type { Nominal } from '../generics';

export const NumericCharacters = '0123456789';
export type NumberString = Nominal<string, 'NumberString'>;
export const isNumberString = createTypeChecker<NumberString, 'NumberString'>(
  'NumberString',
  new RegExp(`^[${NumericCharacters}]*$`),
);
