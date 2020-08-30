import {getType} from '@nlib/global';
import {createTypeChecker} from '../createTypeChecker';

const isDate = createTypeChecker(
    'Date',
    (input: any): input is Date => getType(input) === 'Date',
);

export const isValidDate = createTypeChecker(
    'ValidDate',
    (input: any): input is Date => isDate(input) && 0 < input.getTime(),
);
