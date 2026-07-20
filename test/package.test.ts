import * as assert from "node:assert";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const fixtures = new URL("./fixtures/", import.meta.url);
const require = createRequire(import.meta.url);

const runNode = (source: string) => {
	const result = spawnSync(
		process.execPath,
		["--input-type=module", "--eval", source],
		{
			cwd: repositoryRoot,
			encoding: "utf8",
		},
	);
	assert.equal(result.status, 0, result.stderr || result.stdout);
};

test("ESM, CommonJS, and root package entries preserve runtime behavior", async () => {
	const core = await import("@nlib/typing/core");
	const uuid = await import("@nlib/typing/is/UUIDLowercase");
	const root = await import("@nlib/typing");
	const cjsCore = require("@nlib/typing/core") as typeof core;
	const cjsUuid = require("@nlib/typing/is/UUIDLowercase") as typeof uuid;
	const cjsRoot = require("@nlib/typing") as typeof root;
	const valid = "123e4567-e89b-12d3-a456-426614174000";
	const invalid = "123E4567-E89B-12D3-A456-426614174000";

	for (const [coreEntry, uuidEntry] of [
		[core, uuid],
		[cjsCore, cjsUuid],
	] as const) {
		for (const name of [
			"fromDiagnosis",
			"narrow",
			"typeChecker",
			"union",
			"validate",
			"validateAll",
		]) {
			assert.equal(typeof coreEntry[name], "function");
		}
		assert.equal("ensure" in coreEntry, false);
		assert.equal("isString" in coreEntry, false);
		const checker = coreEntry.typeChecker(
			{ id: uuidEntry.isUUIDLowercase },
			"Payload",
		);
		assert.equal(coreEntry.validate({ id: valid }, checker).ok, true);
		assert.equal(coreEntry.validate({ id: invalid }, checker).ok, false);
		assert.equal(
			coreEntry.ValidationIssueCode.UnexpectedProperty,
			"unexpected_property",
		);
	}
	for (const entry of [uuid, cjsUuid]) {
		assert.equal(entry.isUUIDLowercase(valid), true);
		assert.equal(entry.isUUIDLowercase(invalid), false);
	}
	for (const entry of [root, cjsRoot]) {
		assert.equal(entry.isUUIDLowercase(valid), true);
		assert.equal(typeof entry.ensure, "function");
	}
});

test("npm and JSR publish the same deliberate core and checker subpaths", () => {
	const packageJson = JSON.parse(
		readFileSync(new URL("../package.json", import.meta.url), "utf8"),
	) as {
		sideEffects?: boolean;
		exports: Record<string, string | Record<string, string>>;
	};
	const jsrJson = JSON.parse(
		readFileSync(new URL("../jsr.json", import.meta.url), "utf8"),
	) as { exports: Record<string, string> };
	const npmSubpaths = Object.keys(packageJson.exports)
		.filter((path) => path !== "./package.json")
		.sort();
	const jsrSubpaths = Object.keys(jsrJson.exports).sort();

	assert.equal(packageJson.sideEffects, false);
	assert.deepEqual(npmSubpaths, jsrSubpaths);
	assert.equal(npmSubpaths.includes("./core"), true);
	assert.equal(
		npmSubpaths.some((path) => path.includes("*")),
		false,
	);
	for (const subpath of npmSubpaths) {
		const npmTarget = packageJson.exports[subpath];
		assert.equal(typeof npmTarget, "object");
		if (typeof npmTarget === "object") {
			assert.deepEqual(Object.keys(npmTarget), ["types", "import", "require"]);
			for (const target of Object.values(npmTarget)) {
				assert.equal(
					existsSync(new URL(`../${target}`, import.meta.url)),
					true,
				);
			}
		}
		assert.equal(
			existsSync(new URL(`../${jsrJson.exports[subpath]}`, import.meta.url)),
			true,
		);
	}
});

test("unpublished internal modules remain inaccessible", async () => {
	assert.throws(
		() => require("@nlib/typing/typeChecker"),
		(error: unknown) =>
			error instanceof Error &&
			"code" in error &&
			error.code === "ERR_PACKAGE_PATH_NOT_EXPORTED",
	);
	await assert.rejects(
		import("@nlib/typing/typeChecker"),
		(error: unknown) =>
			error instanceof Error &&
			"code" in error &&
			error.code === "ERR_PACKAGE_PATH_NOT_EXPORTED",
	);
});

test("TypeScript resolves and infers public subpath types", () => {
	const tsc = fileURLToPath(
		new URL("../node_modules/.bin/tsc", import.meta.url),
	);
	const fixture = fileURLToPath(new URL("subpath-types.ts", fixtures));
	const result = spawnSync(
		tsc,
		[
			"--noEmit",
			"--ignoreConfig",
			"--strict",
			"--target",
			"ESNext",
			"--module",
			"NodeNext",
			"--moduleResolution",
			"NodeNext",
			"--types",
			"node",
			fixture,
		],
		{ cwd: repositoryRoot, encoding: "utf8" },
	);
	assert.equal(result.status, 0, result.stderr || result.stdout);
});

test("unused checker imports do not mutate observable checker state", () => {
	runNode(`
		import assert from "node:assert/strict";
		const { typeCheckerConfig } = await import("./mjs/typeChecker.mjs");
		assert.equal(typeCheckerConfig.getNoNameTypeCount(), 0);
		const uuid = await import("@nlib/typing/is/UUIDLowercase");
		const value = "123e4567-e89b-12d3-a456-426614174000";
		assert.equal(uuid.isUUIDLowercase(value), true);
		await import("@nlib/typing/is/TypedArray");
		await import("@nlib/typing/is/ValidDate");
		assert.equal(typeCheckerConfig.getNoNameTypeCount(), 0);
		assert.equal(uuid.isUUIDLowercase(value), true);
	`);
	runNode(`
		import assert from "node:assert/strict";
		const root = await import("@nlib/typing");
		assert.equal(root.typeCheckerConfig.getNoNameTypeCount(), 0);
		assert.equal(
			root.isUUIDLowercase("123e4567-e89b-12d3-a456-426614174000"),
			true,
		);
	`);
});

interface BundleResult {
	readonly bytes: number;
	readonly contribution: ReadonlyMap<string, number>;
}

const bundle = async (fixture: string): Promise<BundleResult> => {
	const result = await build({
		entryPoints: [fileURLToPath(new URL(fixture, fixtures))],
		bundle: true,
		format: "esm",
		logLevel: "silent",
		metafile: true,
		minify: true,
		platform: "browser",
		treeShaking: true,
		write: false,
	});
	const output = result.outputFiles[0];
	const metadata = Object.values(result.metafile.outputs)[0];
	return {
		bytes: output.contents.byteLength,
		contribution: new Map(
			Object.entries(metadata.inputs).map(([path, input]) => [
				path.replaceAll("\\\\", "/"),
				input.bytesInOutput,
			]),
		),
	};
};

const bytesFrom = (result: BundleResult, suffix: string): number => {
	for (const [path, bytes] of result.contribution) {
		if (path.endsWith(suffix)) {
			return bytes;
		}
	}
	return 0;
};

const assertUnrelatedModulesAbsent = (result: BundleResult) => {
	assert.equal(bytesFrom(result, "/codePoints.mjs"), 0);
	assert.equal(bytesFrom(result, "/codePointUtil.mjs"), 0);
	assert.equal(bytesFrom(result, "/is/EmailAddress.mjs"), 0);
	assert.equal(bytesFrom(result, "/is/HttpsUrlString.mjs"), 0);
};

// Measured with these exact fixtures from main at 4a5496c. Each allowance is
// the accepted cost of structured-diagnosis composition for that graph.
const mainBundleBytes = {
	uuid: 4_816,
	numeric: 4_686,
	email: 5_514,
	httpsUrl: 7_524,
	typedArray: 5_080,
} as const;
const allowedBundleGrowth = {
	uuid: 500,
	numeric: 100,
	email: 1_200,
	httpsUrl: 1_200,
	typedArray: 600,
} as const;
// Exact-object paths share typeChecker with scalar checkers. The explicit
// unexpected-property issue and error message add 542–548 minified bytes to
// these graphs; keep a small deterministic margin while retaining the fixed
// core and compound bundle caps below.
const unexpectedPropertyDiagnosticsGrowth = 600;

test("core bundle removes unused exports and unrelated checkers", async (t) => {
	const result = await bundle("bundle-core.mjs");
	t.diagnostic(`minified core bundle: ${result.bytes} bytes`);
	assert.ok(0 < bytesFrom(result, "/typeChecker.mjs"));
	assert.ok(0 < bytesFrom(result, "/validate.mjs"));
	assert.equal(bytesFrom(result, "/narrow.mjs"), 0);
	assert.equal(bytesFrom(result, "/union.mjs"), 0);
	assertUnrelatedModulesAbsent(result);
	assert.ok(result.bytes <= 5_500, `core bundle is ${result.bytes} bytes`);
});

test("individual UUID checker bundle excludes unrelated validators", async (t) => {
	const result = await bundle("bundle-uuid.mjs");
	t.diagnostic(`minified UUID checker bundle: ${result.bytes} bytes`);
	assert.ok(0 < bytesFrom(result, "/is/UUIDLowercase.mjs"));
	assert.ok(0 < bytesFrom(result, "/is/String.mjs"));
	assertUnrelatedModulesAbsent(result);
	assert.ok(
		result.bytes <=
			mainBundleBytes.uuid +
				allowedBundleGrowth.uuid +
				unexpectedPropertyDiagnosticsGrowth,
		`UUID bundle grew from ${mainBundleBytes.uuid} to ${result.bytes} bytes`,
	);
});

test("numeric checker bundle remains near its main baseline", async (t) => {
	const result = await bundle("bundle-numeric.mjs");
	t.diagnostic(`minified numeric checker bundle: ${result.bytes} bytes`);
	assert.ok(0 < bytesFrom(result, "/is/PositiveSafeInteger.mjs"));
	assert.ok(0 < bytesFrom(result, "/is/SafeInteger.mjs"));
	assert.equal(bytesFrom(result, "/codePoints.mjs"), 0);
	assert.equal(bytesFrom(result, "/is/String.mjs"), 0);
	assert.equal(bytesFrom(result, "/is/EmailAddress.mjs"), 0);
	assert.ok(
		result.bytes <=
			mainBundleBytes.numeric +
				allowedBundleGrowth.numeric +
				unexpectedPropertyDiagnosticsGrowth,
		`numeric bundle grew from ${mainBundleBytes.numeric} to ${result.bytes} bytes`,
	);
});

test("email bundle includes only its string refinement dependencies", async (t) => {
	const result = await bundle("bundle-email.mjs");
	t.diagnostic(`minified email checker bundle: ${result.bytes} bytes`);
	assert.ok(0 < bytesFrom(result, "/is/EmailAddress.mjs"));
	assert.ok(0 < bytesFrom(result, "/is/EmailAddressLocalPart.mjs"));
	assert.ok(0 < bytesFrom(result, "/is/DomainName.mjs"));
	assert.equal(bytesFrom(result, "/parseIpv4Address.mjs"), 0);
	assert.equal(bytesFrom(result, "/parseIpv6Address.mjs"), 0);
	assert.equal(bytesFrom(result, "/is/HttpsUrlString.mjs"), 0);
	assert.ok(
		result.bytes <=
			mainBundleBytes.email +
				allowedBundleGrowth.email +
				unexpectedPropertyDiagnosticsGrowth,
		`email bundle grew from ${mainBundleBytes.email} to ${result.bytes} bytes`,
	);
});

test("HTTPS URL bundle retains the intended host dependency graph", async (t) => {
	const result = await bundle("bundle-https-url.mjs");
	t.diagnostic(`minified HTTPS URL checker bundle: ${result.bytes} bytes`);
	assert.ok(0 < bytesFrom(result, "/is/HttpsUrlString.mjs"));
	assert.ok(0 < bytesFrom(result, "/is/UrlHostString.mjs"));
	assert.ok(0 < bytesFrom(result, "/is/DomainName.mjs"));
	assert.ok(0 < bytesFrom(result, "/is/Ipv4Address.mjs"));
	assert.ok(0 < bytesFrom(result, "/is/Ipv6Address.mjs"));
	assert.equal(bytesFrom(result, "/is/EmailAddress.mjs"), 0);
	assert.equal(bytesFrom(result, "/is/TypedArray.mjs"), 0);
	assert.ok(
		result.bytes <=
			mainBundleBytes.httpsUrl +
				allowedBundleGrowth.httpsUrl +
				unexpectedPropertyDiagnosticsGrowth,
		`HTTPS URL bundle grew from ${mainBundleBytes.httpsUrl} to ${result.bytes} bytes`,
	);
});

test("TypedArray bundle excludes string and parser modules", async (t) => {
	const result = await bundle("bundle-typed-array.mjs");
	t.diagnostic(`minified TypedArray checker bundle: ${result.bytes} bytes`);
	assert.ok(0 < bytesFrom(result, "/is/TypedArray.mjs"));
	assert.ok(0 < bytesFrom(result, "/is/NonNegativeSafeInteger.mjs"));
	assert.equal(bytesFrom(result, "/codePoints.mjs"), 0);
	assert.equal(bytesFrom(result, "/parseIpv4Address.mjs"), 0);
	assert.equal(bytesFrom(result, "/parseIpv6Address.mjs"), 0);
	assert.equal(bytesFrom(result, "/is/EmailAddress.mjs"), 0);
	assert.ok(
		result.bytes <=
			mainBundleBytes.typedArray +
				allowedBundleGrowth.typedArray +
				unexpectedPropertyDiagnosticsGrowth,
		`TypedArray bundle grew from ${mainBundleBytes.typedArray} to ${result.bytes} bytes`,
	);
});

test("compound schema bundle includes composition without checker tables", async (t) => {
	const result = await bundle("bundle-compound.mjs");
	t.diagnostic(`minified compound bundle: ${result.bytes} bytes`);
	assert.ok(0 < bytesFrom(result, "/typeChecker.mjs"));
	assert.ok(0 < bytesFrom(result, "/narrow.mjs"));
	assert.ok(0 < bytesFrom(result, "/union.mjs"));
	assertUnrelatedModulesAbsent(result);
	assert.ok(result.bytes <= 6_400, `compound bundle is ${result.bytes} bytes`);
});
