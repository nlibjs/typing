import {createTypeChecker} from '../createTypeChecker';

export const isBoolean = createTypeChecker(
    'Boolean',
    (input: unknown): input is boolean => typeof input === 'boolean',
);
