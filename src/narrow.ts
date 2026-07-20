import { typeChecker } from "./typeChecker.ts";
import type { NarrowingGuard, NarrowingIssue, TypeGuard } from "./types.ts";
import { getDiagnoser, setDiagnoser } from "./validation.private.ts";
import { ValidationIssueCode } from "./validationIssue.ts";

/**
 * Composes a type guard with an additional subtype constraint.
 *
 * The optional diagnosis is evaluated only by structured validation, after the
 * base guard succeeds and the narrowing predicate fails.
 */
export const narrow = <const T, U extends T>(
	typeGuard: TypeGuard<T>,
	narrowing: NarrowingGuard<T, U>,
	diagnosis?: (value: T) => Iterable<NarrowingIssue>,
): TypeGuard<U> => {
	const narrowed = (input: unknown): input is U =>
		typeGuard(input) && narrowing(input);

	setDiagnoser(narrowed, (input, path, report, context) => {
		let baseFailed = false;
		const shouldContinue = getDiagnoser(typeChecker(typeGuard))(
			input,
			path,
			(issue) => {
				baseFailed = true;
				return report(issue);
			},
			context,
		);
		if (baseFailed) {
			return shouldContinue;
		}

		const value = input as T;
		if (narrowing(value)) {
			return true;
		}

		let issueReported = false;
		if (diagnosis) {
			for (const issue of diagnosis(value)) {
				issueReported = true;
				if (!report({ path, ...issue })) {
					return false;
				}
			}
		}
		return (
			issueReported ||
			report({ path, code: ValidationIssueCode.NarrowingFailed })
		);
	});

	return narrowed;
};
