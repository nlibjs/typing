import { createTypeChecker } from '../createTypeChecker.mjs';

export const isUndefined = createTypeChecker(
  'Undefined',
  (input: unknown): input is undefined => typeof input === 'undefined',
);
