import {Number} from '@nlib/global';
import {createTypeChecker} from '../createTypeChecker';
import {TypeGuardOf} from '../generics';

export const isSafeInteger = createTypeChecker<number>(
    'SafeInteger',
    Number.isSafeInteger as TypeGuardOf<number>,
);
