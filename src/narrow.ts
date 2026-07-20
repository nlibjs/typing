import { typeChecker } from "./typeChecker.ts";
import type { NarrowingGuard, NarrowingIssue, TypeGuard } from "./types.ts";
import { getDiagnoser, setDiagnoser } from "./validation.private.ts";
import { ValidationIssueCode } from "./validationIssue.ts";

type Diagnosis<T> = (
	value: T,
	returnIssue?: NarrowingIssue,
) => Iterable<NarrowingIssue>;

const returnIssue: NarrowingIssue = {
	code: ValidationIssueCode.NarrowingFailed,
};
const diagnoses = new WeakMap<object, unknown>();

const createDiagnosisGuard =
	<T, U extends T>(diagnosis: Diagnosis<T>): NarrowingGuard<T, U> =>
	(value): value is U => {
		for (const _issue of diagnosis(value, returnIssue)) {
			return false;
		}
		return true;
	};

const createNarrowedGuard =
	<T, U extends T>(
		typeGuard: TypeGuard<T>,
		narrowing: NarrowingGuard<T, U>,
	): TypeGuard<U> =>
	(input): input is U =>
		typeGuard(input) && narrowing(input);

/**
 * Derives a narrowing predicate from a diagnosis generator.
 *
 * Boolean evaluation stops at the first issue and supplies a shared issue so
 * callers can skip constructing detailed diagnostics with `returnIssue ??`.
 */
export const fromDiagnosis: <T, U extends T>(
	diagnosis: Diagnosis<T>,
) => NarrowingGuard<T, U> = <T, U extends T>(diagnosis: Diagnosis<T>) => {
	const guard = createDiagnosisGuard<T, U>(diagnosis);
	diagnoses.set(guard, diagnosis);
	return guard;
};

/**
 * Composes a type guard with an additional subtype constraint.
 *
 * The optional diagnosis is evaluated only by structured validation, after the
 * base guard succeeds and the narrowing predicate fails.
 */
export const narrow = <const T, U extends T>(
	typeGuard: TypeGuard<T>,
	narrowing: NarrowingGuard<T, U>,
	diagnosis?: Diagnosis<T>,
): TypeGuard<U> => {
	const derivedDiagnosis = diagnoses.get(narrowing) as Diagnosis<T> | undefined;
	const narrowed = createNarrowedGuard(typeGuard, narrowing);

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
		if (!derivedDiagnosis && narrowing(value)) {
			return true;
		}

		let issueReported = false;
		const diagnose = derivedDiagnosis ?? diagnosis;
		if (diagnose) {
			for (const issue of diagnose(value)) {
				issueReported = true;
				if (!report({ ...issue, path: path.concat(issue.path ?? []) })) {
					return false;
				}
			}
		}
		return (
			derivedDiagnosis !== undefined ||
			issueReported ||
			report({ path, code: ValidationIssueCode.NarrowingFailed })
		);
	});

	return narrowed;
};
