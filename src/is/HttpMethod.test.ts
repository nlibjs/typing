import { test } from "node:test";
import * as assert from "node:assert";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isHttpMethod } from "./HttpMethod.ts";

for (const { name, input, expected } of checkerTestCase(
	"HttpMethodGet",
	"HttpMethodOptions",
)) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isHttpMethod(input), expected);
	});
}
