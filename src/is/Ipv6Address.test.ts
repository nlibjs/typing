import { test } from "node:test";
import * as assert from "node:assert";
import { listCheckerTests } from "./listCheckerTests.test.ts";
import { isIpv6Address } from "./Ipv6Address.ts";

for (const { key, input, expected } of listCheckerTests("IPv6")) {
	test(`${key} → ${expected}`, () => {
		assert.equal(isIpv6Address(input), expected);
	});
}
