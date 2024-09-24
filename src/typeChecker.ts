import type { Callable, Dictionary, TypeChecker, TypeGuard } from "./types.ts";
import { getType } from "./getType.ts";
import { defineProperties, keys, values } from "./object.ts";

const getIndent = (depth: number) => "  ".repeat(depth);
const is$Undefined = (v: unknown): v is undefined => typeof v === "undefined";
const is$String = (v: unknown): v is string => typeof v === "string";
const is$RegExp = (v: unknown): v is RegExp => getType(v) === "RegExp";
const is$Set = (v: unknown): v is Set<unknown> => getType(v) === "Set";
const is$Function = (v: unknown): v is Callable => typeof v === "function";
const is$Object = (v: unknown): v is Record<string, unknown> =>
	is$Function(v) || (typeof v === "object" && v !== null);
const memo = <T, S>(getter: (arg: S) => T): ((arg: S) => T) => {
	const weakCache = new WeakMap<object, T>();
	const cache = new Map<S, T>();
	return (arg: S): T => {
		const map = (is$Object(arg) ? weakCache : cache) as Map<S, T>;
		let cached = map.get(arg) as T | undefined;
		if (!cached) {
			cached = getter(arg);
			map.set(arg, cached);
		}
		return cached;
	};
};

type Descriptors<T> = {
	[K in keyof TypeChecker<T>]:
		| { get: (this: TypeChecker<T>) => TypeChecker<T>[K] }
		| { value: TypeChecker<T>[K] };
};

const factory = <T, A>(
	getProps: (
		arg: A,
		name?: string,
	) => Partial<Descriptors<T>> & {
		typeGuard: TypeGuard<T>;
		toString: Descriptors<T>["toString"];
	},
) =>
	memo((arg: A, name?: string) => {
		const { typeGuard, ...others } = getProps(arg, name);
		return defineProperties<TypeChecker<T>, TypeGuard<T>>(typeGuard, {
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
			test: {
				value(input, route) {
					if (typeGuard(input)) {
						return null;
					}
					return new TypeCheckError<T>(this, input, route);
				},
			},
			...others,
		});
	});

const optionalChecker: <T>(isT: TypeChecker<T>) => TypeChecker<T | undefined> =
	factory(<T>(isT: TypeChecker<T>) => ({
		typeGuard: (v: unknown): v is T | undefined => isT(v) || is$Undefined(v),
		optional: {
			get() {
				return this;
			},
		},
		toString: {
			value: (depth = 0) => `${isT.toString(depth)} | undefined`,
		},
	}));

const arrayChecker: <T>(isT: TypeChecker<T>) => TypeChecker<Array<T>> = factory(
	<T>(isT: TypeChecker<T>) => ({
		typeGuard: (v: unknown): v is Array<T> => Array.isArray(v) && v.every(isT),
		toString: { value: (depth = 0) => `Array<${isT.toString(depth)}>` },
	}),
);

const dictionaryChecker: <T>(
	isT: TypeChecker<T>,
) => TypeChecker<Dictionary<T>> = factory(<T>(isT: TypeChecker<T>) => ({
	typeGuard: (v: unknown): v is Dictionary<T> => {
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
	toString: {
		value: (depth = 0) => `Dictionary<${isT.toString(depth)}>`,
	},
}));

export type DefObject<T> = { [K in keyof T]: TypeDefinition<T[K]> };

export type TypeDefinition<T> =
	| TypeGuard<T>
	| Set<T>
	| string
	| DefObject<T>
	| RegExp;

export const typeChecker: <T>(
	definition: TypeDefinition<T>,
	typeName?: string,
) => TypeChecker<T> = factory(<T>(d: TypeDefinition<T>, name = "") => {
	if (is$String(d)) {
		return {
			typeGuard: (v: unknown): v is T => getType(v) === d,
			toString: { value: () => name || d },
		};
	}
	if (is$RegExp(d)) {
		return {
			typeGuard: (v: unknown): v is T => is$String(v) && d.test(v),
			toString: { value: () => name || `${d}` },
		};
	}
	if (is$Set(d)) {
		return {
			typeGuard: (v: unknown): v is T => d.has(v as T),
			toString: { value: () => [...d].join("|") },
		};
	}
	if (is$Function(d)) {
		return {
			typeGuard: d,
			toString: { value: () => name || d.name || "T" },
		};
	}
	const properties = keys(d).map(
		(k): [keyof T & string, TypeChecker<T[keyof T]>] => [
			k,
			typeChecker<T[typeof k]>(d[k]),
		],
	);
	return {
		typeGuard: (v: unknown): v is T =>
			is$Object(v) && properties.every(([k, is]) => is((v as T)[k])),
		toString: {
			value: (depth: number) => {
				const list: Array<string> = [];
				for (const [k, pd] of properties) {
					list.push(`${k}: ${pd.toString(depth + 1)}`);
				}
				const prefix = name ? `${name} ` : "";
				if (list.length <= 3) {
					return `${prefix}{ ${list.join(", ")} }`;
				}
				const indent = getIndent(depth + 1);
				return `${prefix}{${list.map((item) => `${indent}${item},`).join("\n")}${getIndent(depth)}}`;
			},
		},
		test: {
			value(input: unknown, route: Array<string> = []) {
				if (!is$Object(input)) {
					return new TypeCheckError(this, input);
				}
				for (const [k, pd] of properties) {
					const error = pd.test(input[k], route.concat(k));
					if (error) {
						return error;
					}
				}
				return null;
			},
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
