import {createTypeChecker} from '../createTypeChecker';
import {isFiniteNumber} from './FiniteNumber';

export const isPositiveFiniteNumber = createTypeChecker<number>(
    'PositiveFiniteNumber',
    (input: any): input is number => isFiniteNumber(input) && 0 < input,
);
