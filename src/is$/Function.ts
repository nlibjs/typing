import {Callable} from '../generics';

export const is$Function = (
    input: any,
): input is Callable => typeof input === 'function';
