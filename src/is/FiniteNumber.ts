import {Number} from '@nlib/global';
import {createTypeChecker} from '../createTypeChecker';
import {TypeGuardOf} from '../generics';

export const isFiniteNumber = createTypeChecker<number>(
    'FiniteNumber',
    Number.isFinite as TypeGuardOf<number>,
);
