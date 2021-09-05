import {createTypeChecker} from '../createTypeChecker';
import {isFiniteNumber} from './FiniteNumber';

export const isPositiveFiniteNumber = createTypeChecker<number>(
    'PositiveFiniteNumber',
    (input: unknown): input is number => isFiniteNumber(input) && 0 < input,
);
