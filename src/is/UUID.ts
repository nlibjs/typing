import {createTypeChecker} from '../createTypeChecker';
import {Nominal} from '../generics';
import {isString} from './String';

export type UUID = Nominal<string, 'UUID'>;
export const UUIDRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export const isUUID = createTypeChecker<UUID>(
    'UUID',
    (input: any): input is UUID => isString(input) && UUIDRegExp.test(input),
);
