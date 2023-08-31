import { createTypeChecker } from '../createTypeChecker.mjs';
import { is$String } from '../primitive.private.mjs';

export const isString = createTypeChecker('String', is$String);
