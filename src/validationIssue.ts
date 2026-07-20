/** Built-in machine-readable validation issue codes. */
export const ValidationIssueCode = {
	CircularReference: "circular_reference",
	GuardFailed: "guard_failed",
	NarrowingFailed: "narrowing_failed",
	NoUnionMember: "no_union_member",
	PatternMismatch: "pattern_mismatch",
	TypeMismatch: "type_mismatch",
	UnexpectedProperty: "unexpected_property",
	ValueMismatch: "value_mismatch",
} as const;

/** A built-in or caller-defined machine-readable validation issue code. */
export type ValidationIssueCode =
	| (typeof ValidationIssueCode)[keyof typeof ValidationIssueCode]
	| (string & Record<never, never>);
