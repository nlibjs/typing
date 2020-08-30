import {createTypeChecker} from '../createTypeChecker';
import {isSafeInteger} from './SafeInteger';

export const isNonPositiveSafeInteger = createTypeChecker<number>(
    'NonPositiveSafeInteger',
    (input: any): input is number => isSafeInteger(input) && input <= 0,
);
