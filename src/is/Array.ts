import {createTypeChecker} from '../createTypeChecker';
import {is$Array} from '../is$/Array';

export const isArray = createTypeChecker<Array<any>>('Array', is$Array);
