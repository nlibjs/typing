import type {KeyValuePair} from './generics';

interface TypedObject {
    keys: <T>(objectLike: T) => Array<Extract<keyof T, string>>,
    values: <T>(objectLike: T) => Array<T[keyof T]>,
    entries: <T>(objectLike: T) => Array<KeyValuePair<T>>,
}

export const {keys, values, entries} = Object as TypedObject;
