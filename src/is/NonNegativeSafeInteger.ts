import {createTypeChecker} from '../createTypeChecker';
import {isSafeInteger} from './SafeInteger';

export const isNonNegativeSafeInteger = createTypeChecker<number>(
    'NonNegativeSafeInteger',
    (input: unknown): input is number => isSafeInteger(input) && 0 <= input,
);
