import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./listCheckerTests.test.ts";
import { isHttpMethod } from "./HttpMethod.ts";

for (const { key, input, expected } of listCheckerTests(
	"HttpMethodGet",
	"HttpMethodOptions",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isHttpMethod(input), expected);
	});
}
