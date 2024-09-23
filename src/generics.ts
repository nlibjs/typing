export type Nominal<K, T extends string> = K & {
	__brand: T;
	toString: () => string;
};
export type ValueOf<T> = T[keyof T];
export type ArrayItem<T extends Array<unknown>> = T[number];
export type SetItem<T> = T extends Set<infer I> ? I : never;
export type MapKey<T> = T extends Map<infer I, unknown> ? I : never;
export type MapValue<T> = T extends Map<unknown, infer I> ? I : never;
export type KeyValuePair<T, K extends keyof T = Extract<keyof T, string>> = [
	K,
	T[K],
];
export type Callable<Return = unknown> = (...args: Array<unknown>) => Return;
export type TypeGuard<T> = (input: unknown) => input is T;
export type GuardedType<T> = T extends TypeGuard<infer S> ? S : never;
export type Dictionary<T> = Record<string, T>;
export type TypeChecker<T> = TypeGuard<T> & {
	get optional(): TypeChecker<T | undefined>;
	get array(): TypeChecker<Array<T>>;
	get dictionary(): TypeChecker<Dictionary<T>>;
	get toString(): (depth?: number) => string;
};
