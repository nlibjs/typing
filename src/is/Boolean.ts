import {createTypeChecker} from '../createTypeChecker';

export const isBoolean = createTypeChecker(
    'Boolean',
    (input: any): input is boolean => typeof input === 'boolean',
);
