import {createTypeChecker} from '../createTypeChecker';
import {isFiniteNumber} from './FiniteNumber';

export const isNonPositiveFiniteNumber = createTypeChecker<number>(
    'NonPositiveFiniteNumber',
    (input: unknown): input is number => isFiniteNumber(input) && input <= 0,
);
