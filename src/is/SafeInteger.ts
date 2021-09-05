import {createTypeChecker} from '../createTypeChecker';
import type {TypeGuard} from '../generics';

export const isSafeInteger = createTypeChecker<number>(
    'SafeInteger',
    Number.isSafeInteger as TypeGuard<number>,
);
