import {createTypeChecker} from '../createTypeChecker';
import type {Nominal} from '../generics';
import {LatinCharacters} from './LatinString';
import {NumericCharacters} from './NumberString';

export const AlphaNumericCharacters = `${LatinCharacters}${NumericCharacters}`;
export type AlphaNumericString = Nominal<string, 'AlphaNumericString'>;
export const isAlphaNumericString = createTypeChecker<AlphaNumericString, 'AlphaNumericString'>(
    'AlphaNumericString',
    new RegExp(`^[${AlphaNumericCharacters}]*$`),
);
