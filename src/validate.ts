import { typeChecker } from "./typeChecker.ts";
import type {
	TypeDefinition,
	ValidationAllResult,
	ValidationIssue,
	ValidationResult,
} from "./types.ts";
import { getDiagnoser } from "./validation.private.ts";

/**
 * Validates an input and returns the first issue found.
 *
 * The successful result contains the original input without transforming it.
 */
export const validate = <const T>(
	input: unknown,
	definition: TypeDefinition<T>,
): ValidationResult<T> => {
	const checker = typeChecker(definition);
	let issue: ValidationIssue | undefined;
	getDiagnoser(checker)(
		input,
		[],
		(found) => {
			issue = found;
			return false;
		},
		{ objects: new WeakSet() },
	);
	return issue ? { ok: false, issue } : { ok: true, value: input as T };
};

/**
 * Validates an input and returns every issue discoverable by library-owned
 * structural checkers.
 *
 * A plain boolean type guard contributes at most one issue. The successful
 * result contains the original input without transforming it.
 */
export const validateAll = <const T>(
	input: unknown,
	definition: TypeDefinition<T>,
): ValidationAllResult<T> => {
	const checker = typeChecker(definition);
	const issues: Array<ValidationIssue> = [];
	getDiagnoser(checker)(
		input,
		[],
		(issue) => {
			issues.push(issue);
			return true;
		},
		{ objects: new WeakSet() },
	);
	return issues.length
		? {
				ok: false,
				issues: issues as [ValidationIssue, ...Array<ValidationIssue>],
			}
		: { ok: true, value: input as T };
};
