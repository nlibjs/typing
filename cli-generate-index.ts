import * as fs from "node:fs/promises";
import { URL } from "node:url";
import { listFiles } from "./cli-util.ts";

const srcDir = new URL("src/", import.meta.url);
const excludeList = [/\.test\..*$/, /\.private\..*$/];

const lines: Array<string> = [];
for await (const { pathname } of listFiles(srcDir, excludeList)) {
	if (pathname.endsWith(".ts")) {
		lines.push(`export * from "./${pathname.slice(srcDir.pathname.length)}";`);
	}
}
lines.sort((l1, l2) => {
	const s1 = l1.split("/").length;
	const s2 = l2.split("/").length;
	if (s1 === s2) {
		return l1 < l2 ? -1 : 1;
	}
	return s1 < s2 ? -1 : 1;
});
lines.push("");
const destUrl = new URL("mod.ts", srcDir);
await fs.writeFile(destUrl, lines.join("\n"));