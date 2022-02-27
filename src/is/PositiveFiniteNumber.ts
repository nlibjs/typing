import {createTypeChecker} from '../createTypeChecker';
import {isFiniteNumber} from './FiniteNumber';

export const isPositiveFiniteNumber = createTypeChecker(
    'PositiveFiniteNumber',
    (input: unknown): input is number => isFiniteNumber(input) && 0 < input,
);
