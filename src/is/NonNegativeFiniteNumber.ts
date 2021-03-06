import {createTypeChecker} from '../createTypeChecker';
import {isFiniteNumber} from './FiniteNumber';

export const isNonNegativeFiniteNumber = createTypeChecker<number>(
    'NonNegativeFiniteNumber',
    (input: any): input is number => isFiniteNumber(input) && 0 <= input,
);
