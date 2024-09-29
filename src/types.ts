/**
 * A generic type to create a nominal type.
 * @example
 * ```typescript
 * type USD = Nominal<number, 'USD'>;
 * ```
 */
export type Nominal<K, T extends string> = K & {
	__brand: T;
	toString: () => string;
};
/**
 * A type to extract the value type of an object.
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2, c: 3 } as const;
 * type Value = ObjectValue<typeof obj>; // → 1 | 2 | 3
 */
export type ValueOf<T> = T[keyof T];
/**
 * A type to extract the item type of an array.
 * @example
 * ```typescript
 * const arr = [1, 2, 3] as const;
 * type Item = ArrayItem<typeof arr>; // → 1 | 2 | 3
 * ```
 */
export type ArrayItem<T extends Array<unknown>> = T[number];
/**
 * A type to extract the item type of a set.
 * @example
 * ```typescript
 * const set = new Set([1, 2, 3] as const);
 * type Item = SetItem<typeof set>; // → 1 | 2 | 3
 * ```
 */
export type SetItem<T> = T extends Set<infer I> ? I : never;
/**
 * A type to extract the key type of a map.
 * @example
 * ```typescript
 * const map = new Map([['a', 1], ['b', 2], ['c', 3]] as const);
 * type Key = MapKey<typeof map>; // → 'a' | 'b' | 'c'
 * ```
 */
export type MapKey<T> = T extends Map<infer I, unknown> ? I : never;
/**
 * A type to extract the value type of a map.
 * @example
 * ```typescript
 * const map = new Map([['a', 1], ['b', 2], ['c', 3]] as const);
 * type Value = MapValue<typeof map>; // → 1 | 2 | 3
 * ```
 */
export type MapValue<T> = T extends Map<unknown, infer I> ? I : never;
/**
 * A type representing a key-value pair of an object.
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2, c: 3 } as const;
 * type Pair = KeyValuePair<typeof obj>; // → ['a', 1] | ['b', 2] | ['c', 3]
 * ```
 */
export type KeyValuePair<T, K extends keyof T = Extract<keyof T, string>> = [
	K,
	T[K],
];
/**
 * A type representing a callable function.
 */
export type Callable<Return = unknown> = (...args: Array<unknown>) => Return;
/**
 * A type representing a type guard function.
 * @see https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
 */
export type TypeGuard<T> = (input: unknown) => input is T;
/**
 * A type to extract the guarded type from a type guard function.
 * @example
 * ```typescript
 * type Guarded = GuardedType<typeof isString>; // → string
 * ```
 */
export type GuardedType<T> = T extends TypeGuard<infer S> ? S : never;
/**
 * `ReturnType<typeof typeChecker>`
 */
export type TypeChecker<T> = TypeGuard<T> & {
	readonly typeName: string;
	readonly optional: TypeChecker<T | undefined>;
	readonly array: TypeChecker<Array<T>>;
	readonly dictionary: TypeChecker<Record<string, T>>;
	/**
	 * A method used by `ensure()` to validate the input.
	 */
	test(
		this: TypeChecker<T>,
		input: unknown,
		route?: Array<string>,
	): Error | null;
	/**
	 * A method used by `toString()` to serialize the type.
	 */
	serialize(depth: number): Generator<string>;
	toString(): string;
};
