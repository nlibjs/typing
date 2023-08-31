import { createTypeChecker } from '../createTypeChecker';

export const isUndefined = createTypeChecker(
  'Undefined',
  (input: unknown): input is undefined => typeof input === 'undefined',
);
