/** Built-in machine-readable validation issue codes. */
export const ValidationIssueCode = {
	CircularReference: "circular_reference",
	GuardFailed: "guard_failed",
	PatternMismatch: "pattern_mismatch",
	TypeMismatch: "type_mismatch",
	ValueMismatch: "value_mismatch",
} as const;

/** A built-in machine-readable validation issue code. */
export type ValidationIssueCode =
	(typeof ValidationIssueCode)[keyof typeof ValidationIssueCode];
