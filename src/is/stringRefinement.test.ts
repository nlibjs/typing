import * as assert from "node:assert";
import { test } from "node:test";
import type { TypeChecker } from "../types.ts";
import { validate, validateAll } from "../validate.ts";
import { ValidationIssueCode } from "../validationIssue.ts";
import { isDomainName } from "./DomainName.ts";
import { isEmailAddressLocalPart } from "./EmailAddressLocalPart.ts";
import { isIpv4Address } from "./Ipv4Address.ts";
import { isIpv6Address } from "./Ipv6Address.ts";
import { isUUID } from "./UUID.ts";
import { isUUIDLowercase } from "./UUIDLowercase.ts";
import { isUUIDUppercase } from "./UUIDUppercase.ts";

const checkers: ReadonlyArray<readonly [string, TypeChecker<unknown>]> = [
	["UUID", isUUID],
	["UUIDLowercase", isUUIDLowercase],
	["UUIDUppercase", isUUIDUppercase],
	["DomainName", isDomainName],
	["EmailAddressLocalPart", isEmailAddressLocalPart],
	["Ipv4Address", isIpv4Address],
	["Ipv6Address", isIpv6Address],
];

test("refined string checkers preserve names and serialization", () => {
	for (const [name, checker] of checkers) {
		assert.equal(checker.name, "");
		assert.equal(checker.toString(), `TypeChecker<is${name}>`);
	}
});

test("string refinements preserve the base failure", () => {
	assert.deepEqual(validate(1, isUUIDLowercase), {
		ok: false,
		issue: {
			path: [],
			code: ValidationIssueCode.GuardFailed,
			expected: "TypeChecker<isstring>",
			actualType: "Number",
		},
	});
});

test("UUID diagnostics distinguish pattern failures", () => {
	assert.deepEqual(validate("INVALID", isUUIDLowercase), {
		ok: false,
		issue: {
			path: [],
			code: ValidationIssueCode.PatternMismatch,
			expected: "a lowercase UUID",
		},
	});
});

test("diagnosed string refinements return one detailed scalar issue", () => {
	const cases: ReadonlyArray<readonly [TypeChecker<unknown>, unknown, string]> =
		[
			[
				isDomainName,
				"localhost",
				"a domain name with at least two valid labels",
			],
			[
				isEmailAddressLocalPart,
				"a..b",
				"an email address local part of 1 to 64 valid characters",
			],
			[isIpv4Address, "999.0.0.1", "an IPv4 address"],
			[isIpv6Address, "2001::db8::1", "an IPv6 address"],
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
