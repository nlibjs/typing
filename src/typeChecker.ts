import { getType } from "./getType.ts";
import type {
	Callable,
	TypeChecker,
	TypeDefinition,
	TypeGuard,
} from "./types.ts";

const keys = Object.keys as <T>(o: T) => Array<keyof T>;
const values = Object.values as <T>(o: T) => Array<T[keyof T]>;
const defineProperties = Object.defineProperties as <T, S = T>(
	object: S,
	props: { [K in keyof T]: { get: (this: T) => T[K] } | { value: T[K] } },
) => T;
const is$Undefined = (v: unknown): v is undefined => typeof v === "undefined";
const is$String = (v: unknown): v is string => typeof v === "string";
const is$RegExp = (v: unknown): v is RegExp => getType(v) === "RegExp";
const is$Set = (v: unknown): v is Set<unknown> => getType(v) === "Set";
const is$Function = (v: unknown): v is Callable => typeof v === "function";
const is$Object = (v: unknown): v is Record<string, unknown> =>
	is$Function(v) || (typeof v === "object" && v !== null);
const lazy = <T>(getter: () => T): (() => T) => {
	let cached: { value: T } | null = null;
	return () => {
		if (cached === null) {
			cached = { value: getter() };
		}
		return cached.value;
	};
};
const getIndent = (depth: number) => "  ".repeat(depth);

interface FactoryProps<T> {
	typeGuard: TypeGuard<T>;
	serialize(depth: number, done: Map<object, string>): Generator<string>;
	test?(
		this: TypeChecker<T>,
		input: unknown,
		route?: Array<string>,
	): Error | null;
}

let noNameTypeCount = 0;
let cacheStore = new WeakMap<object, WeakMap<object, { value: unknown }>>();
const getCache = <T>(context: object) => {
	let map = cacheStore.get(context);
	if (!map) {
		map = new WeakMap();
		cacheStore.set(context, map);
	}
	return map as WeakMap<object, { value: T }>;
};

/**
 * An object that provides configuration functions for testing purposes.
 */
export const typeCheckerConfig = {
	clearCache() {
		cacheStore = new WeakMap();
	},
	getNoNameTypeCount() {
		return noNameTypeCount;
	},
	resetNoNameTypeCount(count = 0) {
		noNameTypeCount = count;
	},
} satisfies {
	/** Clears the cache. */
	clearCache(): void;
	/** Gets the count of types without names. */
	getNoNameTypeCount(): number;
	/** Resets the count of types without names. */
	resetNoNameTypeCount(count?: number): void;
};

const factory =
	<T, A>(props: (arg: A, name: string) => FactoryProps<T>) =>
	(arg: A, typeName = `T${++noNameTypeCount}`) => {
		const checkerCache = getCache<TypeChecker<T>>(factory);
		const cache = getCache<TypeChecker<T>>(props);
		let cached: { value: TypeChecker<T> } | undefined;
		if (is$Object(arg)) {
			cached = cache.get(arg);
		}
		if (cached) {
			return cached.value;
		}
		const { typeGuard, serialize, test } = props(arg, typeName);
		cached = checkerCache.get(typeGuard);
		if (cached) {
			return cached.value;
		}
		if (is$Object(arg)) {
			cache.set(arg, { value: typeGuard as TypeChecker<T> });
		}
		checkerCache.set(typeGuard, { value: typeGuard as TypeChecker<T> });
		return defineProperties<TypeChecker<T>, TypeGuard<T>>(typeGuard, {
			test: test
				? { value: test }
				: {
						value(input, route) {
							if (typeGuard(input)) {
								return null;
							}
							return new TypeCheckError<T>(this, input, route);
						},
					},
			serialize: { value: serialize },
			toString: {
				value() {
					return ["TypeChecker<", ...serialize(0, new Map()), ">"].join("");
				},
			},
		});
	};

/**
 * Returns `TypeChecker<T | undefined>` from `TypeDefinition<T>`.
 */
export const isOptionalOf: <T>(
	definition: TypeDefinition<T>,
	typeName?: string,
) => TypeChecker<T | undefined> = factory(
	<T>(definition: TypeDefinition<T>, typeName: string) => {
		const isT = typeChecker(definition, typeName);
		const k = `isOptionalOf${typeName}`;
		return {
			typeGuard: {
				[k]: (v: unknown): v is T | undefined => isT(v) || is$Undefined(v),
			}[k],
			*serialize(depth, done) {
				yield* isT.serialize(depth, done);
				yield " | undefined";
			},
		};
	},
);

/**
 * Returns `TypeChecker<Array<T>>` from `TypeDefinition<T>`.
 */
export const isArrayOf: <T>(
	definition: TypeDefinition<T>,
	typeName?: string,
) => TypeChecker<Array<T>> = factory(
	<T>(definition: TypeDefinition<T>, typeName: string) => {
		const isT = typeChecker(definition, typeName);
		const k = `isArrayOf${typeName}`;
		return {
			typeGuard: {
				[k]: (v: unknown): v is Array<T> =>
					Array.isArray(v) && v.every((i) => isT(i)),
			}[k],
			*serialize(depth, done) {
				yield "Array<";
				yield* isT.serialize(depth, done);
				yield ">";
			},
		};
	},
);

/**
 * Returns `TypeChecker<Record<string, T>>` from `TypeDefinition<T>`.
 */
export const isDictionaryOf: <T>(
	definition: TypeDefinition<T>,
	typeName?: string,
) => TypeChecker<Record<string, T>> = factory(
	<T>(definition: TypeDefinition<T>, typeName: string) => {
		const isT = typeChecker(definition, typeName);
		const k = `isDictionaryOf${typeName}`;
		return {
			typeGuard: {
				[k]: (v: unknown): v is Record<string, T> => {
					if (!is$Object(v)) {
						return false;
					}
					for (const item of values(v)) {
						if (!isT(item)) {
							return false;
						}
					}
					return true;
				},
			}[k],
			*serialize(depth, done) {
				yield "Record<string, ";
				yield* isT.serialize(depth, done);
				yield ">";
			},
		};
	},
);

/**
 * Create a type checker from a type definition.
 * @example
 * ```typescript
 * // Create a type checker from a type guard function.
 * const isNonNegativeInteger = typeChecker(
 *   (input: unknown): input is number => Number.isInteger(input) && 0 <= input,
 * );
 *
 * // Create a type checker for a class instance.
 * // Values are checked by `getType(input) === "Point"`
 * class Point {}
 * const isPoint = typeChecker("Point");
 *
 * // Create a type checker for a string literal.
 * const isLowerHex = typeChecker(/^[0-9a-f]+$/);
 *
 * // Create a type checker for a set of values.
 * const isColor = typeChecker(new Set(["red", "green", "blue"]));
 *
 * // Create a type checker for an object.
 * type Person = { name: string; age: number };
 * const isPerson = typeChecker({
 *   name: isString,
 *   age: isNonNegativeInteger,
 * });
 * ```
 * @param definition A type definition.
 * @param typeName A type name.
 * @returns A type checker.
 */
export const typeChecker: <T>(
	definition: TypeDefinition<T>,
	typeName?: string,
) => TypeChecker<T> = factory(<T>(d: TypeDefinition<T>, typeName: string) => {
	const k = `is${typeName}`;
	if (is$String(d)) {
		return {
			typeGuard: { [k]: (v: unknown): v is T => getType(v) === d }[k],
			*serialize() {
				yield d;
			},
		};
	}
	if (is$RegExp(d)) {
		return {
			typeGuard: { [k]: (v: unknown): v is T => is$String(v) && d.test(v) }[k],
			*serialize() {
				yield `${d}`;
			},
		};
	}
	if (is$Set(d)) {
		return {
			typeGuard: { [k]: (v: unknown): v is T => d.has(v as T) }[k],
			*serialize() {
				let count = 0;
				for (const item of d) {
					if (count++) {
						yield " | ";
					}
					yield JSON.stringify(item);
				}
			},
		};
	}
	if (is$Function(d)) {
		return {
			typeGuard: d,
			*serialize() {
				yield `${d.name || k}`;
			},
		};
	}
	type PropertyTuple<K extends keyof T = keyof T> = [K, TypeChecker<T[K]>];
	const properties = lazy(
		(): Array<PropertyTuple> => [
			...(function* () {
				for (const k of keys(d)) {
					const propertyPath = `${typeName}.${String(k)}`;
					yield [k, typeChecker(d[k], propertyPath)] as PropertyTuple;
				}
			})(),
		],
	);
	const typeGuard = (
		v: unknown,
		refs = new WeakMap<WeakKey, string>(),
	): v is T => {
		if (!is$Object(v)) {
			return false;
		}
		if (refs.has(v)) {
			throw new Error(`CircularReference: ${refs.get(v)} -> ${typeName}`);
		}
		refs.set(v, typeName);
		return properties().every(([k, is]) =>
			(is as (input: T[typeof k], refs: WeakMap<WeakKey, string>) => boolean)(
				(v as T)[k],
				refs,
			),
		);
	};
	return {
		typeGuard,
		*serialize(depth, done) {
			let id = done.get(d);
			if (!is$Undefined(id)) {
				yield `Ref:${id}`;
				return;
			}
			id = typeName;
			done.set(d, id);
			yield `${id} {\n`;
			const propertyIndent = getIndent(depth + 1);
			for (const [k, pd] of properties()) {
				yield `${propertyIndent}${String(k)}: `;
				yield* pd.serialize(depth + 1, done);
				yield ",\n";
			}
			yield `${getIndent(depth)}}`;
		},
		test(input: unknown, route: Array<string | number | symbol> = []) {
			if (!is$Object(input)) {
				return new TypeCheckError(this, input);
			}
			for (const [k, pd] of properties()) {
				const error = pd.test((input as T)[k], route.concat(k));
				if (error) {
					return error;
				}
			}
			return null;
		},
	};
});

class TypeCheckError<T> extends Error {
	constructor(
		checker: TypeChecker<T>,
		value: unknown,
		route?: Array<string | number | symbol>,
	) {
		const name = route ? `.${route.join(".")}` : "The value";
		super(
			`TypeCheckError: ${name} ${value} is not of type ${checker.toString()}`,
		);
	}
}
