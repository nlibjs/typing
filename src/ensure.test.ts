import * as assert from "node:assert";
import { test } from "node:test";
import { ensure } from "./ensure.ts";
import { isString } from "./is/String.ts";
import { typeChecker } from "./typeChecker.ts";

test("throw an error", () => {
	const regexp = /^Error: TypeCheckError/;
	assert.throws(() => ensure(1, isString), regexp);
});

test("reports the first unexpected property without rendering the input", () => {
	const isAccount = typeChecker({ profile: { name: isString } }, "Account");

	assert.throws(
		() =>
			ensure(
				{ profile: { name: "Ada", role: "admin", secret: "value" } },
				isAccount,
			),
		(error: unknown) => {
			assert.ok(error instanceof Error);
			assert.match(error.message, /Unexpected property \.profile\.role\./);
			assert.match(error.message, /requires an exact object/);
			assert.match(error.message, /use isObjectWith\(\.\.\.\)/);
			assert.doesNotMatch(error.message, /\[object Object\]/);
			assert.doesNotMatch(error.message, /secret/);
			return true;
		},
	);
});
