import { createTypeChecker } from '../createTypeChecker';
import { is$String } from '../primitive.private';

export const isString = createTypeChecker('String', is$String);
