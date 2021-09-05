import {createTypeChecker} from '../createTypeChecker';
import {is$Array} from '../is.private';

export const isArray = createTypeChecker<Array<unknown>>('Array', is$Array);
