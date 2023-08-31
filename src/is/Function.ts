import { createTypeChecker } from '../createTypeChecker';
import type { Callable } from '../generics';

export const isFunction = createTypeChecker(
  'Function',
  (input: unknown): input is Callable => typeof input === 'function',
);
