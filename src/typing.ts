import type { Callable, Dictionary, TypeGuard } from "./generics.ts";
import { getType } from "./getType.ts";
import { defineProperties, keys, values } from "./object.ts";

const getIndent = (depth: number) => "  ".repeat(depth);
const is$Undefined = (v: unknown): v is undefined => typeof v === "undefined";
const is$String = (v: unknown): v is string => typeof v === "string";
const is$Number = (v: unknown): v is number => typeof v === "number";
const is$RegExp = (v: unknown): v is RegExp => getType(v) === "RegExp";
const is$Function = (v: unknown): v is Callable => typeof v === "function";
const is$Object = (v: unknown): v is Record<string, unknown> =>
	is$Function(v) || (typeof v === "object" && v !== null);
const memo = <T, S extends object>(getter: (arg: S) => T): ((arg: S) => T) => {
	const cache = new WeakMap<S, T>();
	return (arg: S): T => {
		let cached = cache.get(arg) as T | undefined;
		if (!cached) {
			cached = getter(arg);
			cache.set(arg, cached);
		}
		return cached;
	};
};

export type Checker<T> = TypeGuard<T> & {
	get optional(): Checker<T | undefined>;
	get array(): Checker<Array<T>>;
	get dictionary(): Checker<Dictionary<T>>;
	get toString(): (depth?: number) => string;
};

type Descriptors<T> = {
	[K in keyof Checker<T>]:
		| { get: (this: Checker<T>) => Checker<T>[K] }
		| { value: Checker<T>[K] };
};

const factory = <T, A extends object>(
	getProps: (
		arg: A,
		name?: string,
	) => Partial<Descriptors<T>> & {
		toString: Descriptors<T>["toString"];
		typeGuard: TypeGuard<T>;
	},
) =>
	memo((arg: A, name?: string) => {
		const { typeGuard, ...others } = getProps(arg, name);
		return defineProperties<Checker<T>, TypeGuard<T>>(typeGuard, {
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
			...others,
		});
	});

const optionalChecker: <T>(isT: Checker<T>) => Checker<T | undefined> = factory(
	<T>(isT: Checker<T>) => ({
		typeGuard: (v: unknown): v is T | undefined => isT(v) || is$Undefined(v),
		optional: {
			get() {
				return this;
			},
		},
		toString: {
			value: (depth = 0) => `${isT.toString(depth)} | undefined`,
		},
	}),
);

const arrayChecker: <T>(isT: Checker<T>) => Checker<Array<T>> = factory(
	<T>(isT: Checker<T>) => ({
		typeGuard: (v: unknown): v is Array<T> => Array.isArray(v) && v.every(isT),
		toString: { value: (depth = 0) => `Array<${isT.toString(depth)}>` },
	}),
);

const dictionaryChecker: <T>(isT: Checker<T>) => Checker<Dictionary<T>> =
	factory(<T>(isT: Checker<T>) => ({
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

export type DefProperty<T> =
	| Checker<T>
	| RegExp
	| (T extends object ? DefObject<T> : never);

const defPropertyToTypeGuard = <T>(d: DefProperty<T>): TypeGuard<T> => {
	if (is$RegExp(d)) {
		return (v: unknown): v is T => is$String(v) && d.test(v);
	}
	if (is$Function(d)) {
		return d;
	}
	return defObjectToTypeGuard(d);
};

const serializeDefProperty = <T>(d: DefProperty<T>, depth = 0): string => {
	if (is$RegExp(d)) {
		return `${d}`;
	}
	if (is$Function(d)) {
		return d.toString(depth);
	}
	return serializeDefObject(d, depth + 1);
};

export type DefObject<T> = { [K in keyof T]: DefProperty<T[K]> };

const defObjectToTypeGuard = <T>(d: DefObject<T>): TypeGuard<T> => {
	const properties = keys(d).map((k): [keyof T, TypeGuard<T[keyof T]>] => [
		k,
		defPropertyToTypeGuard<T[typeof k]>(d[k]),
	]);
	return (v: unknown): v is T =>
		is$Object(v) && properties.every(([k, is]) => is((v as T)[k]));
};

const serializeDefObject = <T>(
	d: DefObject<T>,
	depth = 0,
	typeName?: string,
): string => {
	const list: Array<string> = [];
	for (const k of keys(d)) {
		const property = serializeDefProperty<T[typeof k]>(d[k], depth + 1);
		list.push(`${k}: ${property}`);
	}
	const prefix = typeName ? `${typeName} ` : "";
	if (list.length <= 3) {
		return `${prefix}{ ${list.join(", ")} }`;
	}
	const indent = getIndent(depth + 1);
	return `${prefix}{${list.map((item) => `${indent}${item},`).join("\n")}${getIndent(depth)}}`;
};

export const objectChecker: <T extends object>(
	definition: DefObject<T>,
	typeName?: string,
) => Checker<T> = factory(
	<T extends object>(definition: DefObject<T>, typeName?: string) => ({
		typeGuard: defObjectToTypeGuard(definition),
		toString: {
			value: (depth = 0) => serializeDefObject(definition, depth, typeName),
		},
	}),
);

export type DefString<T extends string> = ((v: string) => v is T) | RegExp;

const defStringToTypeGuard = <T extends string>(
	d: DefString<T>,
): TypeGuard<T> => {
	if (is$RegExp(d)) {
		return (v: unknown): v is T => is$String(v) && d.test(v);
	}
	return (v: unknown): v is T => is$String(v) && d(v);
};

const serializeDefString = <T extends string>(
	d: DefString<T>,
	typeName?: string,
): string => {
	let result = is$RegExp(d) ? `${d}` : d.name || "string";
	if (typeName) {
		result = `${typeName} ${result}`;
	}
	return result;
};

export const stringChecker: <T extends string>(
	definition: DefString<T>,
	typeName?: string,
) => Checker<T> = factory(
	<T extends string>(definition: DefString<T>, typeName?: string) => ({
		typeGuard: defStringToTypeGuard(definition),
		toString: { value: () => serializeDefString(definition, typeName) },
	}),
);

export type DefNumber = (v: number) => boolean;

const defNumberToTypeGuard = <T extends number>(d: DefNumber): TypeGuard<T> => {
	return (v: unknown): v is T => is$Number(v) && d(v);
};

const serializeDefNumber = (d: DefNumber, typeName?: string): string => {
	let result = d.name || "number";
	if (typeName) {
		result = `${typeName} ${result}`;
	}
	return result;
};

export const numberChecker: <T extends number>(
	definition: DefNumber,
	typeName?: string,
) => Checker<T> = factory((definition: DefNumber, typeName?: string) => ({
	typeGuard: defNumberToTypeGuard(definition),
	toString: { value: () => serializeDefNumber(definition, typeName) },
}));

export const typeChecker: <T>(
	definition: TypeGuard<T>,
	typeName?: string,
) => Checker<T> = factory(<T>(definition: TypeGuard<T>, typeName?: string) => ({
	typeGuard: definition,
	toString: { value: () => typeName || definition.name || "T" },
}));
