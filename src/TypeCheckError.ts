import type { TypeChecker } from "./types.ts";

export class TypeCheckError<T> extends Error {
	constructor(checker: TypeChecker<T>, value: unknown, route?: Array<string>) {
		const name = route ? `.${route.join(".")}` : "The value";
		super(
			`TypeCheckError: ${name} ${value} is not of type ${checker.toString()}`,
		);
	}
}
