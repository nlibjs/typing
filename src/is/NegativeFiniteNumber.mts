import { createTypeChecker } from '../createTypeChecker.mjs';
import { isFiniteNumber } from './FiniteNumber.mjs';

export const isNegativeFiniteNumber = createTypeChecker(
  'NegativeFiniteNumber',
  (input: unknown): input is number => isFiniteNumber(input) && input < 0,
);
