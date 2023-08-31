import { createTypeChecker } from '../createTypeChecker.mjs';

export const isBoolean = createTypeChecker(
  'Boolean',
  (input: unknown): input is boolean => typeof input === 'boolean',
);
