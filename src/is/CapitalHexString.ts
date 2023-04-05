import {createTypeChecker} from '../createTypeChecker';
import type {Nominal} from '../generics';

export type CapitalHexString = Nominal<string, 'CapitalHexString'>;
export const isCapitalHexString = createTypeChecker<CapitalHexString, 'CapitalHexString'>(
    'CapitalHexString',
    /^[0-9A-F]*$/,
);
