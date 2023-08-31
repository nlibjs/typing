import { createTypeChecker } from '../createTypeChecker';
import type { TypeGuard } from '../generics';

export const isSafeInteger = createTypeChecker(
  'SafeInteger',
  Number.isSafeInteger as TypeGuard<number>,
);
