import type { Callable, TypeChecker, TypeGuard } from "./types.ts";
import { getType } from "./getType.ts";
import { defineProperties, keys, values } from "./object.ts";

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
const serializeGenerics = function* (
	name: string,
	argName: string,
	serializer: Generator<string>,
	open = "<",
	close = ">",
) {
	yield `${name}${open}${argName}${close}`;
	let buffer: string | null = "";
	for (const chunk of serializer) {
		if (is$String(buffer)) {
			buffer += chunk;
			if (!argName.startsWith(buffer) || argName.length < buffer.length) {
				yield `\n${argName} = ${buffer}`;
				buffer = null;
			}
		} else {
			yield chunk;
		}
	}
	if (buffer && argName !== buffer) {
		yield `\n${argName} = ${buffer}`;
	}
};
const getIndent = (depth: number) => "  ".repeat(depth);

interface FactoryProps<T> {
	typeGuard: TypeGuard<T>;
	serialize(depth: number): Generator<string>;
	test?(
		this: TypeChecker<T>,
		input: unknown,
		route?: Array<string>,
	): Error | null;
}

let noNameTypeCount = 0;

export const resetNoNameTypeCount = () => {
	noNameTypeCount = 0;
};

const factory = <T, A>(props: (arg: A, name: string) => FactoryProps<T>) => {
	const cache = new WeakMap<object, TypeChecker<T>>();
	return (arg: A, typeName = `T${++noNameTypeCount}`) => {
		let checker = is$Object(arg) && cache.get(arg);
		if (checker) {
			return checker;
		}
		const { typeGuard, serialize, test } = props(arg, typeName);
		checker = defineProperties<TypeChecker<T>, TypeGuard<T>>(typeGuard, {
			typeName: { value: typeName },
			optional: {
				get() {
					return optionalChecker(this);
				},
			},
			array: {
				get() {
					return arrayChecker(this);
				},
			},
			dictionary: {
				get() {
					return dictionaryChecker(this);
				},
			},
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
				value: (depth = 0) =>
					[
						...serializeGenerics("TypeChecker", typeName, serialize(depth)),
					].join(""),
			},
		});
		if (is$Object(arg)) {
			cache.set(arg, checker);
		}
		cache.set(checker, checker);
		return checker;
	};
};

const optionalChecker: <T>(isT: TypeChecker<T>) => TypeChecker<T | undefined> =
	factory(<T>(isT: TypeChecker<T>) => ({
		typeGuard: (v: unknown): v is T | undefined => isT(v) || is$Undefined(v),
		optional: {
			get() {
				return this;
			},
		},
		*serialize(depth) {
			yield* isT.serialize(depth);
			yield " | undefined";
		},
	}));

const arrayChecker: <T>(isT: TypeChecker<T>) => TypeChecker<Array<T>> = factory(
	<T>(isT: TypeChecker<T>) => ({
		typeGuard: (v: unknown): v is Array<T> => Array.isArray(v) && v.every(isT),
		*serialize(depth) {
			yield* serializeGenerics("Array", isT.typeName, isT.serialize(depth));
		},
	}),
);

const dictionaryChecker: <T>(
	isT: TypeChecker<T>,
) => TypeChecker<Record<string, T>> = factory(<T>(isT: TypeChecker<T>) => ({
	typeGuard: (v: unknown): v is Record<string, T> => {
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
	*serialize(depth) {
		yield* serializeGenerics(
			"Record",
			isT.typeName,
			isT.serialize(depth),
			"<string, ",
		);
	},
}));

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
 *
 * // Some utilities.
 * isPerson.optional;   // TypeChecker<Person | undefined>
 * isPerson.array;      // TypeChecker<Array<Person>>
 * isPerson.dictionary; // TypeChecker<Record<string, Person>>
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
	const properties = lazy(() =>
		keys(d).map((k): [keyof T & string, TypeChecker<T[keyof T]>] => [
			k,
			typeChecker<T[typeof k]>(d[k], `${typeName}.${k}`),
		]),
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
		*serialize(depth) {
			yield "{\n";
			const propertyIndent = getIndent(depth + 1);
			for (const [k, pd] of properties()) {
				yield `${propertyIndent}${k}: `;
				yield* pd.serialize(depth + 1);
				yield ",\n";
			}
			yield `${getIndent(depth)}}`;
		},
		test(input: unknown, route: Array<string> = []) {
			if (!is$Object(input)) {
				return new TypeCheckError(this, input);
			}
			for (const [k, pd] of properties()) {
				const error = pd.test(input[k], route.concat(k));
				if (error) {
					return error;
				}
			}
			return null;
		},
	};
});

class TypeCheckError<T> extends Error {
	constructor(checker: TypeChecker<T>, value: unknown, route?: Array<string>) {
		const name = route ? `.${route.join(".")}` : "The value";
		super(
			`TypeCheckError: ${name} ${value} is not of type ${checker.toString()}`,
		);
	}
}
