import * as fs from "node:fs/promises";
import { ensure } from "./src/ensure.ts";
import { isString } from "./src/is/String.ts";

const hasNameAndVersion = {
	name: isString,
	version: isString,
};

const packageJsonUrl = new URL("package.json", import.meta.url);
const packageJson = await fs
	.readFile(packageJsonUrl, "utf-8")
	.then((json) => ensure(JSON.parse(json), hasNameAndVersion));

const jsrJsonUrl = new URL("jsr.json", import.meta.url);
const jsrJson = await fs
	.readFile(jsrJsonUrl, "utf-8")
	.then((json) => ensure(JSON.parse(json), hasNameAndVersion));

jsrJson.name = packageJson.name;
jsrJson.version = packageJson.version;

await fs.writeFile(jsrJsonUrl, `${JSON.stringify(jsrJson, null, "\t")}\n`);
