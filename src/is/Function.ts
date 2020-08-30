import {createTypeChecker} from '../createTypeChecker';

export interface AnyFunction {
    (...args: Array<any>): any,
}

export const isFunction = createTypeChecker(
    'Function',
    (input: any): input is AnyFunction => typeof input === 'function',
);
