import type { KeyValuePair } from "./types.ts";

/**
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
 */
export const keys = Object.keys as <T>(o: T) => Array<Extract<keyof T, string>>;
/**
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/values
 */
export const values = Object.values as <T>(o: T) => Array<T[keyof T]>;
/**
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
 */
export const entries = Object.entries as <T>(o: T) => Array<KeyValuePair<T>>;
/**
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */
export const defineProperties = Object.defineProperties as <T, S = T>(
	object: S,
	props: { [K in keyof T]: { get: (this: T) => T[K] } | { value: T[K] } },
) => T;
