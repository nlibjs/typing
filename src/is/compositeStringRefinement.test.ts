import * as assert from "node:assert";
import { test } from "node:test";
import type { TypeChecker } from "../types.ts";
import { validate, validateAll } from "../validate.ts";
import { ValidationIssueCode } from "../validationIssue.ts";
import { isEmailAddress } from "./EmailAddress.ts";
import { isHttpsUrlString } from "./HttpsUrlString.ts";
import { isUrlHostString } from "./UrlHostString.ts";

const checkers: ReadonlyArray<readonly [string, TypeChecker<unknown>]> = [
	["EmailAddress", isEmailAddress],
	["UrlHostString", isUrlHostString],
	["HttpsUrlString", isHttpsUrlString],
];

test("composite string checkers preserve names and serialization", () => {
	for (const [name, checker] of checkers) {
		assert.equal(checker.name, "");
		assert.equal(checker.toString(), `TypeChecker<is${name}>`);
	}
});

test("composite string refinements preserve the base failure", () => {
	assert.deepEqual(validate(1, isEmailAddress), {
		ok: false,
		issue: {
			path: [],
			code: ValidationIssueCode.GuardFailed,
			expected: "TypeChecker<isstring>",
			actualType: "Number",
		},
	});
});

test("composite string refinements return one detailed scalar issue", () => {
	const cases: ReadonlyArray<readonly [TypeChecker<unknown>, unknown, string]> =
		[
			[isEmailAddress, "local@localhost", "an email address"],
			[isUrlHostString, "example.com:port", "a URL host string"],
			[isHttpsUrlString, "http://example.com", "an HTTPS URL string"],
		];

	for (const [checker, input, expected] of cases) {
		const issue = {
			path: [],
			code: ValidationIssueCode.NarrowingFailed,
			expected,
		};
		assert.deepEqual(validate(input, checker), { ok: false, issue });
		assert.deepEqual(validateAll(input, checker), {
			ok: false,
			issues: [issue],
		});
	}
});

test("composite string refinements preserve successful values", () => {
	const cases: ReadonlyArray<readonly [TypeChecker<unknown>, string]> = [
		[isEmailAddress, "local@example.com"],
		[isUrlHostString, "example.com:443"],
		[isHttpsUrlString, "https://example.com/path"],
	];

	for (const [checker, input] of cases) {
		assert.deepEqual(validate(input, checker), { ok: true, value: input });
	}
});
