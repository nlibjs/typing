import {createTypeChecker} from '../createTypeChecker';
import {isSafeInteger} from './SafeInteger';

export const isPositiveSafeInteger = createTypeChecker<number>(
    'PositiveSafeInteger',
    (input: any): input is number => isSafeInteger(input) && 0 < input,
);
