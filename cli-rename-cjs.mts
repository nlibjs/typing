/* eslint-env es6 */
//@ts-check
import * as fs from "node:fs/promises";
import { URL } from "node:url";
import * as console from "node:console";

const listFiles = async function* (fileUrl: URL): AsyncGenerator<URL> {
	const stats = await fs.stat(fileUrl);
	if (stats.isFile()) {
		yield fileUrl;
		return;
	}
	if (stats.isDirectory()) {
		fileUrl.pathname = fileUrl.pathname.replace(/\/*$/, "/");
		for (const name of await fs.readdir(fileUrl)) {
			yield* listFiles(new URL(name, fileUrl));
		}
	}
};

const renames: Array<[URL, URL]> = [];
const cjsDir = new URL("cjs/", import.meta.url);
for await (const file of listFiles(cjsDir)) {
	if (/\.m[jt]s$/.test(file.pathname)) {
		const renamed = new URL(file.href);
		renamed.pathname = renamed.pathname.replace(/\.m([jt])s$/, ".c$1s");
		renames.push([file, renamed]);
	}
}

await Promise.all(
	renames.map(async ([from, to]) => {
		let code = await fs.readFile(from, "utf8");
		code = code.replace(/\.m([jt])s(['"])/g, ".c$1s$2");
		await fs.writeFile(to, code);
		await fs.unlink(from);
		console.info("renamed", to.pathname.slice(cjsDir.pathname.length));
	}),
);
