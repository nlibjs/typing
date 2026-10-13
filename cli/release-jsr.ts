import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { glob, lstat, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export async function releaseJsr({
	cwd = process.cwd(),
	check = false,
	env = process.env,
	fetcher = fetch,
	publish = (): void => {
		execFileSync("npx", ["--yes", "jsr@0.14.3", "publish"], {
			cwd,
			stdio: "inherit",
		});
	},
} = {}) {
	const json = async (file: string) =>
		JSON.parse(await readFile(resolve(cwd, file), "utf8"));
	const pkg = await json("package.json"),
		config = await json("jsr.json");
	assert.equal(pkg.name, "@nlib/typing");
	assert.equal(pkg.repository, "https://github.com/nlibjs/typing");
	assert.match(pkg.version, /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/);
	for (const key of ["name", "version", "description"])
		assert.equal(config[key], pkg[key], key);
	assert.deepEqual(config.publish, {
		include: ["LICENSE.txt", "README.md", "src/**/*"],
		exclude: ["**/*.test.ts"],
	});
	assert.deepEqual(
		Object.keys(config.exports).sort(),
		Object.keys(pkg.exports)
			.filter((k) => k !== "./package.json")
			.sort(),
	);
	const manifest: Record<string, { size: number; checksum: string }> = {};
	for await (const file of glob(
		["LICENSE.txt", "README.md", "jsr.json", "src/**/*"],
		{ cwd, exclude: ["src/**/*.test.ts"] },
	)) {
		const stat = await lstat(resolve(cwd, file));
		assert.ok(!stat.isSymbolicLink(), `JSR symlink: ${file}`);
		if (stat.isDirectory()) continue;
		assert.ok(stat.isFile(), file);
		const bytes = await readFile(resolve(cwd, file));
		manifest[`/${file}`] = {
			size: bytes.length,
			checksum: `sha256-${createHash("sha256").update(bytes).digest("hex")}`,
		};
	}
	for (const path of Object.values(config.exports)) {
		assert.equal(typeof path, "string");
		assert.ok(
			Object.hasOwn(manifest, String(path).replace(/^\.\//, "/")),
			`Missing export: ${path}`,
		);
	}
	if (check) return;
	assert.equal(env.GITHUB_REPOSITORY, "nlibjs/typing");
	assert.match(env.GITHUB_SHA || "", /^[a-f0-9]{40}$/);
	assert.equal(env.RELEASE_TAG, `v${pkg.version}`);
	assert.ok(
		["release", "workflow_dispatch"].includes(env.GITHUB_EVENT_NAME || ""),
	);
	const request = async (url: string, github = false) => {
		const response = await fetcher(url, {
			headers: github
				? {
						Authorization: `Bearer ${env.GH_TOKEN}`,
						Accept: "application/vnd.github+json",
					}
				: { Accept: "application/json" },
			redirect: "error",
		});
		if (response.status === 404 && !github) return null;
		assert.ok(response.ok, `${url}: HTTP ${response.status}`);
		const data = await response.json();
		assert.ok(
			data && typeof data === "object" && !Array.isArray(data),
			`Invalid metadata: ${url}`,
		);
		return data;
	};
	const source = async () => {
		const api = "https://api.github.com/repos/nlibjs/typing";
		const release = await request(
			`${api}/releases/tags/${env.RELEASE_TAG}`,
			true,
		);
		assert.equal(release.tag_name, env.RELEASE_TAG);
		assert.equal(release.draft, false);
		assert.equal(release.prerelease, false);
		let { object } = await request(
			`${api}/git/ref/tags/${env.RELEASE_TAG}`,
			true,
		);
		for (let depth = 0; object.type === "tag" && depth < 20; depth++) {
			assert.match(object.sha, /^[a-f0-9]{40}$/);
			({ object } = await request(`${api}/git/tags/${object.sha}`, true));
		}
		assert.equal(object.type, "commit");
		assert.equal(
			object.sha,
			env.GITHUB_SHA,
			"Release tag moved or wrong dispatch commit",
		);
	};
	await source();
	const base = "https://jsr.io/@nlib/typing";
	const remote = await request(`${base}/${pkg.version}_meta.json`);
	if (remote !== null) {
		assert.deepEqual(remote.exports, config.exports, "JSR exports differ");
		assert.deepEqual(
			remote.manifest,
			manifest,
			"JSR published content differs",
		);
		console.log(`JSR ${pkg.name}@${pkg.version} already matches`);
		return;
	}
	const metadata = await request(`${base}/meta.json`);
	assert.ok(metadata, "Cannot confirm JSR package identity");
	assert.equal(metadata.scope, "nlib");
	assert.equal(metadata.name, "typing");
	assert.deepEqual(metadata.githubRepository, {
		owner: "nlibjs",
		name: "typing",
	});
	assert.ok(
		metadata.versions &&
			typeof metadata.versions === "object" &&
			!Array.isArray(metadata.versions),
	);
	assert.ok(
		!Object.hasOwn(metadata.versions, pkg.version),
		"JSR version exists without readable content",
	);
	await source();
	publish();
}

if (import.meta.url === pathToFileURL(resolve(process.argv[1] || "")).href) {
	await releaseJsr({ check: process.argv.includes("--check") });
}
