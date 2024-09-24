import type { KeyValuePair } from "./types.ts";

export const keys = Object.keys as <T>(o: T) => Array<Extract<keyof T, string>>;
export const values = Object.values as <T>(o: T) => Array<T[keyof T]>;
export const entries = Object.entries as <T>(o: T) => Array<KeyValuePair<T>>;
export const defineProperties = Object.defineProperties as <T, S = T>(
	object: S,
	props: { [K in keyof T]: { get: (this: T) => T[K] } | { value: T[K] } },
) => T;
