import { createTypeChecker } from '../createTypeChecker';
import { isSafeInteger } from './SafeInteger';

export const isNegativeSafeInteger = createTypeChecker(
  'NegativeSafeInteger',
  (input: unknown): input is number => isSafeInteger(input) && input < 0,
);
