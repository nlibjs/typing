import {createTypeChecker} from '../createTypeChecker';

const {prototype: {toString}} = Object;

const isDate = createTypeChecker(
    'Date',
    (input: unknown): input is Date => toString.call(input) === '[object Date]',
);

export const isValidDate = createTypeChecker(
    'ValidDate',
    (input: unknown): input is Date => isDate(input) && 0 < input.getTime(),
);
