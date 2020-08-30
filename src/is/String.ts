import {createTypeChecker} from '../createTypeChecker';
import {is$String} from '../is$/String';

export const isString = createTypeChecker<string>('String', is$String);
