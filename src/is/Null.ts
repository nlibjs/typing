import {createTypeChecker} from '../createTypeChecker';

export const isNull = createTypeChecker(
    'Null',
    (input: unknown): input is null => input === null,
);
