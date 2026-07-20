import { getType } from "./getType.ts";
import type {
	Callable,
	ObjectTypeDefinition,
	TypeChecker,
	TypeDefinition,
	TypeGuard,
	ValidationIssue,
} from "./types.ts";
import {
	type Diagnoser,
	getDiagnoser,
	setDiagnoser,
	type ValidationIssueReporter,
} from "./validation.private.ts";
import { ValidationIssueCode } from "./validationIssue.ts";

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
const is$Object = (v: unknown): v is Record<PropertyKey, unknown> =>
	is$Function(v) || (typeof v === "object" && v !== null);
const is$PlainObject = (v: unknown): v is Record<PropertyKey, unknown> => {
	if (typeof v !== "object" || v === null) {
		return false;
	}
	const prototype = Object.getPrototypeOf(v);
	return prototype === Object.prototype || prototype === null;
};
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
	diagnose?: (
		checker: TypeChecker<T>,
		input: unknown,
		path: ReadonlyArray<string | number>,
		report: ValidationIssueReporter,
		context: Parameters<Diagnoser>[3],
	) => boolean;
	test?(
		this: TypeChecker<T>,
		input: unknown,
		route?: Array<string | number | symbol>,
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

const createIssue = <T>(
	checker: TypeChecker<T>,
	input: unknown,
	path: ReadonlyArray<string | number>,
	code: ValidationIssueCode,
): ValidationIssue => ({
	path,
	code,
	expected: checker.toString(),
	actualType: getType(input),
});

const diagnoseCircularReference = <T>(
	checker: TypeChecker<T>,
	input: WeakKey,
	path: ReadonlyArray<string | number>,
	report: ValidationIssueReporter,
	context: Parameters<Diagnoser>[3],
): boolean | null => {
	if (context.objects.has(input)) {
		return report(
			createIssue(checker, input, path, ValidationIssueCode.CircularReference),
		);
	}
	context.objects.add(input);
	return null;
};

/**
 * An object that provides configuration functions for testing purposes.
 */
export const typeCheckerConfig: {
	/** Clears the cache. */
	clearCache(): void;
	/** Returns the number of unnamed types. */
	getNoNameTypeCount(): number;
	/** Resets the unnamed type counter. */
	resetNoNameTypeCount(count?: number): void;
} = {
	clearCache() {
		cacheStore = new WeakMap();
	},
	getNoNameTypeCount() {
		return noNameTypeCount;
	},
	resetNoNameTypeCount(count = 0) {
		noNameTypeCount = count;
	},
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
		const { typeGuard, serialize, diagnose, test } = props(arg, typeName);
		cached = checkerCache.get(typeGuard);
		if (cached) {
			return cached.value;
		}
		const checker = defineProperties<TypeChecker<T>, TypeGuard<T>>(typeGuard, {
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
		if (is$Object(arg)) {
			cache.set(arg, { value: checker });
		}
		checkerCache.set(typeGuard, { value: checker });
		setDiagnoser(checker, (input, path, report, context) =>
			diagnose
				? diagnose(checker, input, path, report, context)
				: checker(input) ||
					report(
						createIssue(checker, input, path, ValidationIssueCode.GuardFailed),
					),
		);
		return checker;
	};

/**
 * Returns `TypeChecker<T | undefined>` from `TypeDefinition<T>`.
 */
export const isOptionalOf: <const T>(
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
			diagnose(_checker, input, path, report, context) {
				return (
					is$Undefined(input) || getDiagnoser(isT)(input, path, report, context)
				);
			},
		};
	},
);

/**
 * Returns `TypeChecker<Array<T>>` from `TypeDefinition<T>`.
 */
export const isArrayOf: <const T>(
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
			diagnose(checker, input, path, report, context) {
				if (!Array.isArray(input)) {
					return report(
						createIssue(checker, input, path, ValidationIssueCode.TypeMismatch),
					);
				}
				const circular = diagnoseCircularReference(
					checker,
					input,
					path,
					report,
					context,
				);
				if (circular !== null) {
					return circular;
				}
				try {
					for (const [index, item] of input.entries()) {
						if (!getDiagnoser(isT)(item, path.concat(index), report, context)) {
							return false;
						}
					}
					return true;
				} finally {
					context.objects.delete(input);
				}
			},
		};
	},
);

/**
 * Returns `TypeChecker<Record<string, T>>` from `TypeDefinition<T>`.
 */
export const isDictionaryOf: <const T>(
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
			diagnose(checker, input, path, report, context) {
				if (!is$Object(input)) {
					return report(
						createIssue(checker, input, path, ValidationIssueCode.TypeMismatch),
					);
				}
				const circular = diagnoseCircularReference(
					checker,
					input,
					path,
					report,
					context,
				);
				if (circular !== null) {
					return circular;
				}
				try {
					for (const key of keys(input)) {
						if (
							typeof key !== "symbol" &&
							!getDiagnoser(isT)(
								input[key],
								path.concat(String(key)),
								report,
								context,
							)
						) {
							return false;
						}
					}
					return true;
				} finally {
					context.objects.delete(input);
				}
			},
		};
	},
);

/**
 * Creates a type checker from a type definition.
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
export const typeChecker: <const T>(
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
			diagnose(checker, input, path, report) {
				return (
					getType(input) === d ||
					report(
						createIssue(checker, input, path, ValidationIssueCode.TypeMismatch),
					)
				);
			},
		};
	}
	if (is$RegExp(d)) {
		return {
			typeGuard: { [k]: (v: unknown): v is T => is$String(v) && d.test(v) }[k],
			*serialize() {
				yield `${d}`;
			},
			diagnose(checker, input, path, report) {
				return (
					(is$String(input) && d.test(input)) ||
					report(
						createIssue(
							checker,
							input,
							path,
							ValidationIssueCode.PatternMismatch,
						),
					)
				);
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
			diagnose(checker, input, path, report) {
				return (
					d.has(input as T) ||
					report(
						createIssue(
							checker,
							input,
							path,
							ValidationIssueCode.ValueMismatch,
						),
					)
				);
			},
		};
	}
	if (is$Function(d)) {
		return {
			typeGuard: d,
			*serialize() {
				yield `${d.name || k}`;
			},
			diagnose(checker, input, path, report) {
				return (
					d(input) ||
					report(
						createIssue(checker, input, path, ValidationIssueCode.GuardFailed),
					)
				);
			},
		};
	}
	return objectFactoryProps(d, typeName, true);
});

/**
 * Creates an open-shape type checker from an object definition.
 *
 * Declared properties are validated, while additional properties are allowed.
 * Unlike an object definition passed directly to `typeChecker()`, this checker
 * retains shape-based matching for functions, arrays, and class instances.
 */
export const isObjectWith: <const T extends object>(
	definition: ObjectTypeDefinition<T>,
	typeName?: string,
) => TypeChecker<T> = factory(
	<T extends object>(d: ObjectTypeDefinition<T>, typeName: string) =>
		objectFactoryProps(d, typeName, false),
);

const objectFactoryProps = <T>(
	d: { [K in keyof T]: TypeDefinition<T[K]> },
	typeName: string,
	exact: boolean,
): FactoryProps<T> => {
	type PropertyTuple<K extends keyof T = keyof T> = readonly [
		K,
		TypeChecker<T[K]>,
	];
	const toPropertyTuple = <K extends keyof T>(k: K): PropertyTuple<K> => {
		const propertyPath = `${typeName}.${String(k)}`;
		return [k, typeChecker(d[k], propertyPath)];
	};
	const properties = lazy(
		(): Array<PropertyTuple> => keys(d).map((k) => toPropertyTuple(k)),
	);
	const propertyKeys = lazy(
		() => new Set<PropertyKey>(properties().map(([key]) => key)),
	);
	const acceptsObject = (
		input: unknown,
	): input is Record<PropertyKey, unknown> =>
		exact ? is$PlainObject(input) : is$Object(input);
	const hasUnknownKey = (input: Record<PropertyKey, unknown>): boolean =>
		keys(input).some((key) => !propertyKeys().has(key));
	const getProperty = (
		input: Record<PropertyKey, unknown>,
		key: keyof T,
	): unknown => (exact && !Object.hasOwn(input, key) ? undefined : input[key]);
	type TypeGuardWithRefs<U> = (
		input: unknown,
		refs?: WeakMap<WeakKey, string>,
	) => input is U;
	const runGuard = <U>(
		checker: TypeChecker<U>,
		input: unknown,
		refs: WeakMap<WeakKey, string>,
	): boolean => (checker as TypeGuardWithRefs<U>)(input, refs);
	const typeGuard = (
		v: unknown,
		refs = new WeakMap<WeakKey, string>(),
	): v is T => {
		if (!acceptsObject(v)) {
			return false;
		}
		if (refs.has(v)) {
			throw new Error(`CircularReference: ${refs.get(v)} -> ${typeName}`);
		}
		if (exact && hasUnknownKey(v)) {
			return false;
		}
		refs.set(v, typeName);
		return properties().every(([k, is]) =>
			runGuard(is, getProperty(v, k), refs),
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
		diagnose(checker, input, path, report, context) {
			if (!acceptsObject(input)) {
				return report(
					createIssue(checker, input, path, ValidationIssueCode.TypeMismatch),
				);
			}
			const circular = diagnoseCircularReference(
				checker,
				input,
				path,
				report,
				context,
			);
			if (circular !== null) {
				return circular;
			}
			try {
				if (
					exact &&
					hasUnknownKey(input) &&
					!report(
						createIssue(checker, input, path, ValidationIssueCode.TypeMismatch),
					)
				) {
					return false;
				}
				for (const [key, property] of properties()) {
					if (
						typeof key !== "symbol" &&
						!getDiagnoser(property)(
							getProperty(input, key),
							path.concat(String(key)),
							report,
							context,
						)
					) {
						return false;
					}
				}
				return true;
			} finally {
				context.objects.delete(input);
			}
		},
		test(input: unknown, route: Array<string | number | symbol> = []) {
			if (!acceptsObject(input) || (exact && hasUnknownKey(input))) {
				return new TypeCheckError(this, input);
			}
			for (const [k, pd] of properties()) {
				const error = pd.test(getProperty(input, k), route.concat(k));
				if (error) {
					return error;
				}
			}
			return null;
		},
	};
};

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
