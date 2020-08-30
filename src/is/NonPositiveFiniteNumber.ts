import {createTypeChecker} from '../createTypeChecker';
import {isFiniteNumber} from './FiniteNumber';

export const isNonPositiveFiniteNumber = createTypeChecker<number>(
    'NonPositiveFiniteNumber',
    (input: any): input is number => isFiniteNumber(input) && input <= 0,
);
