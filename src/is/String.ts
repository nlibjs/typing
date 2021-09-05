import {createTypeChecker} from '../createTypeChecker';
import {is$String} from '../is.private';

export const isString = createTypeChecker<string>('String', is$String);
