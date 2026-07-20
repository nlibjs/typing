import { isNever } from "./is/Never.ts";
import { typeChecker } from "./typeChecker.ts";
import type { Guarded, TypeGuard, ValidationIssue } from "./types.ts";
import { getDiagnoser, setDiagnoser } from "./validation.private.ts";
import { ValidationIssueCode } from "./validationIssue.ts";

/** Returns the type guard that never succeeds. */
export function union(): typeof isNever;

/** Returns the only type guard without wrapping it. */
export function union<const Guard extends TypeGuard<unknown>>(
	typeGuard: Guard,
): Guard;

/**
 * Combines type guards in argument order and succeeds when any guard succeeds.
 */
export function union<
	const Guards extends readonly [
		TypeGuard<unknown>,
		TypeGuard<unknown>,
		...Array<TypeGuard<unknown>>,
	],
>(...typeGuards: Guards): TypeGuard<Guarded<Guards[number]>>;

export function union(
	...typeGuards: ReadonlyArray<TypeGuard<unknown>>
): TypeGuard<unknown> {
	if (typeGuards.length === 0) {
		return isNever;
	}
	if (typeGuards.length === 1) {
		return typeGuards[0] as TypeGuard<unknown>;
	}

	const combined = (input: unknown): input is unknown => {
		for (const typeGuard of typeGuards) {
			if (typeGuard(input)) {
				return true;
			}
		}
		return false;
	};

	setDiagnoser(combined, (input, path, report, context) => {
		const branchIssues: Array<ValidationIssue> = [];
		for (const typeGuard of typeGuards) {
			const issues: Array<ValidationIssue> = [];
			getDiagnoser(typeChecker(typeGuard))(
				input,
				path,
				(issue) => {
					issues.push(issue);
					return true;
				},
				context,
			);
			if (issues.length === 0) {
				return true;
			}
			branchIssues.push(...issues);
		}

		if (!report({ path, code: ValidationIssueCode.NoUnionMember })) {
			return false;
		}
		for (const issue of branchIssues) {
			if (!report(issue)) {
				return false;
			}
		}
		return true;
	});

	return combined;
}
