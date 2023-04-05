import {createTypeChecker} from '../createTypeChecker';
import type {Nominal} from '../generics';

export const SmallLatinCharacters = 'abcdefghijklmnopqrstuvwxyz';
export type SmallLatinString = Nominal<string, 'SmallLatinString'>;
export const isSmallLatinString = createTypeChecker<SmallLatinString, 'SmallLatinString'>(
    'SmallLatinString',
    /^[a-z]*$/,
);
