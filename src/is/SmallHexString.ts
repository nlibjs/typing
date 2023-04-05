import {createTypeChecker} from '../createTypeChecker';
import type {Nominal} from '../generics';

export type SmallHexString = Nominal<string, 'SmallHexString'>;
export const isSmallHexString = createTypeChecker<SmallHexString, 'SmallHexString'>(
    'SmallHexString',
    /^[0-9a-f]*$/,
);
