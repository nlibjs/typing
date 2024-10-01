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
 * A type representing a key-value pair of an object.
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2, c: 3 } as const;
 * type Pair = KeyValueTuple<typeof obj>; // → ['a', 1] | ['b', 2] | ['c', 3]
 * ```
 */
export type KeyValueTuple<T> = { [K in keyof T]: [K, T[K]] }[keyof T];
/**
 * A type representing a callable function.
 */
export type Callable<T = unknown, A extends Array<unknown> = Array<unknown>> = (
	...args: A
) => T;
/**
 * A type representing a type guard function.
 * @see https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
 */
export type TypeGuard<T> = (input: unknown) => input is T;
/**
 * A type to extract the guarded type from a type guard function.
 * @example
 * ```typescript
 * type Guarded = Guarded<typeof isString>; // → string
 * ```
 */
export type Guarded<T> = T extends TypeGuard<infer S> ? S : never;
/**
 * A type of the first argument of `typeChecker()`.
 */
export type TypeDefinition<T> =
	| TypeGuard<T>
	| string
	| Set<T>
	| RegExp
	| { [K in keyof T]: TypeDefinition<T[K]> };
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
		route?: Array<string | number | symbol>,
	): Error | null;
	/**
	 * A method used by `toString()` to serialize the type.
	 * @private
	 */
	serialize(depth: number, done: Map<object, string>): Generator<string>;
	toString(): string;
};
