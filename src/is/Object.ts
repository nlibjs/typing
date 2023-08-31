import { createTypeChecker } from '../createTypeChecker';
import { is$Object } from '../primitive.private';

export const isObject = createTypeChecker('Object', is$Object);
