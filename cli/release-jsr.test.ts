import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
	mkdir,
	mkdtemp,
	readFile,
	rm,
	symlink,
	writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test, { type TestContext } from "node:test";
import { releaseJsr } from "./release-jsr.ts";

async function fixture(t: TestContext) {
	const cwd = await mkdtemp(join(tmpdir(), "typing-jsr-"));
	t.after(() => rm(cwd, { recursive: true, force: true }));
	const pkg = {
		name: "@nlib/typing",
		version: "1.2.3",
		description: "Test",
		repository: "https://github.com/nlibjs/typing",
		exports: { ".": {}, "./package.json": "./package.json" },
	};
	const config = {
		name: pkg.name,
		version: pkg.version,
		description: pkg.description,
		exports: { ".": "./src/mod.ts" },
		publish: {
			include: ["LICENSE.txt", "README.md", "src/**/*"],
			exclude: ["**/*.test.ts"],
		},
	};
	await mkdir(join(cwd, "src"));
	for (const [file, bytes] of Object.entries({
		"package.json": JSON.stringify(pkg),
		"jsr.json": JSON.stringify(config),
		"LICENSE.txt": "license",
		"README.md": "readme",
		"src/mod.ts": "export {};",
		"src/mod.test.ts": "excluded",
	}))
		await writeFile(join(cwd, file), bytes);
	const manifest: Record<string, { size: number; checksum: string }> = {};
	for (const file of ["jsr.json", "LICENSE.txt", "README.md", "src/mod.ts"]) {
		const bytes = await readFile(join(cwd, file));
		manifest[`/${file}`] = {
			size: bytes.length,
			checksum: `sha256-${createHash("sha256").update(bytes).digest("hex")}`,
		};
	}
	const env = {
		GITHUB_REPOSITORY: "nlibjs/typing",
		GITHUB_SHA: "a".repeat(40),
		RELEASE_TAG: "v1.2.3",
		GITHUB_EVENT_NAME: "release",
		GH_TOKEN: "test",
	};
	const f = {
		cwd,
		env,
		config,
		manifest,
		publishes: 0,
		status: 200,
		remote: { exports: config.exports, manifest } as unknown,
		versions: {} as Record<string, unknown>,
		sha: env.GITHUB_SHA,
		annotated: false,
		draft: false,
		tagReads: 0,
	};
	const options = {
		cwd,
		env,
		publish: () => {
			f.publishes++;
		},
		fetcher: (async (input, init) => {
			const url = String(input);
			if (url.startsWith("https://api.github.com/")) {
				assert.equal(
					new Headers(init?.headers).get("Authorization"),
					"Bearer test",
				);
				if (url.includes("/releases/"))
					return Response.json({
						tag_name: env.RELEASE_TAG,
						draft: f.draft,
						prerelease: false,
					});
				if (url.includes("/git/ref/")) f.tagReads++;
				return Response.json({
					object: {
						type: f.annotated && url.includes("/git/ref/") ? "tag" : "commit",
						sha: f.sha,
					},
				});
			}
			assert.equal(new Headers(init?.headers).has("Authorization"), false);
			if (url.endsWith("/meta.json"))
				return Response.json({
					scope: "nlib",
					name: "typing",
					githubRepository: { owner: "nlibjs", name: "typing" },
					versions: f.versions,
				});
			return f.status === 200
				? Response.json(f.remote)
				: new Response("", { status: f.status });
		}) as typeof fetch,
	};
	return { f, options };
}

test("matching JSR content is a no-op, including annotated tags and excluded tests", async (t) => {
	const { f, options } = await fixture(t);
	f.annotated = true;
	await releaseJsr(options);
	assert.equal(f.publishes, 0);
});
test("only explicit absence with matching package identity permits publication", async (t) => {
	const { f, options } = await fixture(t);
	f.status = 404;
	await releaseJsr(options);
	assert.equal(f.publishes, 1);
	assert.equal(f.tagReads, 2);
	f.versions["1.2.3"] = { yanked: true };
	await assert.rejects(releaseJsr(options), /exists without readable/);
	assert.equal(f.publishes, 1);
});
test("source, metadata, and published content conflicts never publish", async (t) => {
	const { f, options } = await fixture(t);
	for (const remote of [
		null,
		false,
		{},
		{ exports: {}, manifest: f.manifest },
		{ exports: f.config.exports, manifest: {} },
	]) {
		f.remote = remote;
		await assert.rejects(releaseJsr(options));
	}
	f.sha = "b".repeat(40);
	await assert.rejects(releaseJsr(options), /tag moved/);
	f.sha = f.env.GITHUB_SHA;
	f.draft = true;
	await assert.rejects(releaseJsr(options));
	assert.equal(f.publishes, 0);
});
test("lookup failures and ambiguous responses never permit publication", async (t) => {
	const { f, options } = await fixture(t);
	for (const status of [403, 429, 500, 302]) {
		f.status = status;
		await assert.rejects(releaseJsr(options), /HTTP/);
	}
	await assert.rejects(
		releaseJsr({
			...options,
			fetcher: async () => {
				throw new Error("network");
			},
		}),
		/network/,
	);
	assert.equal(f.publishes, 0);
});
test("tag changes during absence checks stop before publication", async (t) => {
	const { f, options } = await fixture(t);
	f.status = 404;
	const fetcher = options.fetcher;
	await assert.rejects(
		releaseJsr({
			...options,
			fetcher: async (url, init) => {
				if (String(url).endsWith("/meta.json")) f.sha = "b".repeat(40);
				return fetcher(url, init);
			},
		}),
		/tag moved/,
	);
	assert.equal(f.publishes, 0);
});
test("local preparation checks metadata and exports without registry access", async (t) => {
	const { f, options } = await fixture(t);
	const local = {
		...options,
		check: true,
		fetcher: async () => {
			throw new Error("unexpected lookup");
		},
	};
	await releaseJsr(local);
	await writeFile(
		join(f.cwd, "jsr.json"),
		JSON.stringify({ ...f.config, version: "9.9.9" }),
	);
	await assert.rejects(releaseJsr(local));
	await writeFile(
		join(f.cwd, "jsr.json"),
		JSON.stringify({ ...f.config, exports: { ".": "../escape.ts" } }),
	);
	await assert.rejects(releaseJsr(local), /Missing export/);
	assert.equal(f.publishes, 0);
});
test("symlinks in published source are rejected", async (t) => {
	const { f, options } = await fixture(t);
	await symlink("../README.md", join(f.cwd, "src/link.ts"));
	await assert.rejects(releaseJsr({ ...options, check: true }), /symlink/);
});
