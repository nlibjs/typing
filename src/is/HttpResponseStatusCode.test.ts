import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.ts";
import { isHttpResponseStatusCode } from "./HttpResponseStatusCode.ts";

for (const { key, input, expected } of listCheckerTests(
	"HttpResponseStatusCodeOk",
	"HttpResponseStatusCodeNotFound",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isHttpResponseStatusCode(input), expected);
	});
}
