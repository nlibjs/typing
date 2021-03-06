import {createTypeChecker} from '../createTypeChecker';
import {isFiniteNumber} from './FiniteNumber';

export const isNegativeFiniteNumber = createTypeChecker<number>(
    'NegativeFiniteNumber',
    (input: any): input is number => isFiniteNumber(input) && input < 0,
);
