import {createTypeChecker} from '../createTypeChecker';
import {isSafeInteger} from './SafeInteger';

export const isNegativeSafeInteger = createTypeChecker<number>(
    'NegativeSafeInteger',
    (input: unknown): input is number => isSafeInteger(input) && input < 0,
);
