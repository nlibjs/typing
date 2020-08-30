import {createTypeChecker} from '../createTypeChecker';
import {is$ObjectLike} from '../is$/ObjectLike';

export const isObjectLike = createTypeChecker(
    'ObjectLike',
    is$ObjectLike,
);
