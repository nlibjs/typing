import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./tests.private.ts";
import { isHttpsUrlString } from "./HttpsUrlString.ts";

for (const { key, input, expected } of listCheckerTests(
	"HttpsUrl",
	"HttpsUrlWithPort",
)) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isHttpsUrlString(input), expected);
	});
}
