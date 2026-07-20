import type { TypeChecker, ValidationIssue } from "./types.ts";

export interface ValidationContext {
	readonly objects: WeakSet<WeakKey>;
}

export type ValidationIssueReporter = (issue: ValidationIssue) => boolean;

export type Diagnoser = (
	input: unknown,
	path: ReadonlyArray<string | number>,
	report: ValidationIssueReporter,
	context: ValidationContext,
) => boolean;

const diagnosers = new WeakMap<object, Diagnoser>();

export const getDiagnoser = <T>(checker: TypeChecker<T>): Diagnoser => {
	const diagnose = diagnosers.get(checker);
	if (!diagnose) {
		throw new Error("TypeChecker diagnoser is not registered");
	}
	return diagnose;
};

export const setDiagnoser = <T>(
	checker: TypeChecker<T>,
	diagnose: Diagnoser,
): void => {
	diagnosers.set(checker, diagnose);
};
