import {createTypeChecker} from '../createTypeChecker';
import {isFiniteNumber} from './FiniteNumber';

export const isNegativeFiniteNumber = createTypeChecker<number>(
    'NegativeFiniteNumber',
    (input: unknown): input is number => isFiniteNumber(input) && input < 0,
);
