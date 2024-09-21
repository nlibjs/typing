import type { KeyValuePair } from "./generics.ts";

interface TypedObject {
	keys: <T>(objectLike: T) => Array<Extract<keyof T, string>>;
	values: <T>(objectLike: T) => Array<T[keyof T]>;
	entries: <T>(objectLike: T) => Array<KeyValuePair<T>>;
}
export const keys = Object.keys as TypedObject["keys"];
export const values = Object.values as TypedObject["values"];
export const entries = Object.entries as TypedObject["entries"];
