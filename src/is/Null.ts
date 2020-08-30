import {createTypeChecker} from '../createTypeChecker';

export const isNull = createTypeChecker(
    'Null',
    (input: any): input is null => input === null,
);
