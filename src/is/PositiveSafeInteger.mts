import { createTypeChecker } from '../createTypeChecker.mjs';
import { isSafeInteger } from './SafeInteger.mjs';

export const isPositiveSafeInteger = createTypeChecker(
  'PositiveSafeInteger',
  (input: unknown): input is number => isSafeInteger(input) && 0 < input,
);
