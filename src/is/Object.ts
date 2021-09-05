import {createTypeChecker} from '../createTypeChecker';
import {is$Object} from '../is.private';

export const isObject = createTypeChecker(
    'Object',
    is$Object,
);
