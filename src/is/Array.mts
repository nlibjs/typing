import { createTypeChecker } from '../createTypeChecker.mjs';
import { is$Array } from '../primitive.private.mjs';

export const isArray = createTypeChecker('Array', is$Array);
