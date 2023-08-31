import { createTypeChecker } from '../createTypeChecker.mjs';
import type { Callable } from '../generics.mjs';

export const isFunction = createTypeChecker(
  'Function',
  (input: unknown): input is Callable => typeof input === 'function',
);
