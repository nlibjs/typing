import {is$Function} from './Function';

export const is$ObjectLike = <T = any>(
    input: any,
): input is Record<string, T> => is$Function(input)
|| (typeof input === 'object' && input !== null);
