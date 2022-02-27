import {createTypeChecker} from '../createTypeChecker';
import type {TypeGuard} from '../generics';

export const isFiniteNumber = createTypeChecker(
    'FiniteNumber',
    Number.isFinite as TypeGuard<number>,
);
