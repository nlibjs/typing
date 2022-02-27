import {createTypeChecker} from '../createTypeChecker';
import {isFiniteNumber} from './FiniteNumber';

export const isNonPositiveFiniteNumber = createTypeChecker(
    'NonPositiveFiniteNumber',
    (input: unknown): input is number => isFiniteNumber(input) && input <= 0,
);
