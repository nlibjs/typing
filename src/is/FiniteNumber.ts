import {createTypeChecker} from '../createTypeChecker';
import type {TypeGuard} from '../generics';

export const isFiniteNumber = createTypeChecker<number>(
    'FiniteNumber',
    Number.isFinite as TypeGuard<number>,
);
