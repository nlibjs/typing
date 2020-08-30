import {createTypeChecker} from '../createTypeChecker';

export const isUndefined = createTypeChecker(
    'Undefined',
    (input: any): input is undefined => typeof input === 'undefined',
);
