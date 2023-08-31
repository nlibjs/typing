import { createTypeChecker } from '../createTypeChecker';
import { is$Array } from '../primitive.private';

export const isArray = createTypeChecker('Array', is$Array);
