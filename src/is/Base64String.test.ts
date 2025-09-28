import * as assert from "node:assert";
import { test } from "node:test";
import { checkerTestCase } from "../checkerTestCase.test.ts";
import { isBase64String } from "./Base64String.ts";

for (const { name, input, expected } of checkerTestCase(
	"Base64",
	"CapitalLatin",
	"SmallLatin",
	"Digits65",
	"Digits64",
	"Localhost",
	"NonEmptyString",
	"HttpMethodGet",
	"HttpMethodOptions",
	"Hex",
	"SmallHex",
	"CapitalHex",
)) {
	test(`${name} → ${expected}`, () => {
		assert.equal(isBase64String(input), expected);
	});
}
