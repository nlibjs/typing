import {createTypeChecker} from '../createTypeChecker';
import {isSafeInteger} from './SafeInteger';

export const isNonPositiveSafeInteger = createTypeChecker(
    'NonPositiveSafeInteger',
    (input: unknown): input is number => isSafeInteger(input) && input <= 0,
);
