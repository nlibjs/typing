import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.mjs";
import { isHttpMethod } from "./HttpMethod.mjs";

for (const { key, input, expected } of listCheckerTests(
	"HttpMethodGet",
	"HttpMethodOptions",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isHttpMethod(input), expected);
	});
}
