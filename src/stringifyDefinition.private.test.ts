import { test } from "node:test";
import * as assert from "node:assert";
import { definition } from "./definition.ts";
import type { Definition } from "./generics.ts";
import { isString } from "./is/String.ts";
import { isUUID } from "./is/UUID.ts";
import { stringifyDefinition } from "./stringifyDefinition.private.ts";

const isNumber = (input: unknown) => typeof input === "number";

test("should stringify the function", () => {
	assert.equal(stringifyDefinition(isNumber), "isNumber");
});

test("should return the name", () => {
	assert.equal(stringifyDefinition(isString), "is$String");
});

test("should stringify enum", () => {
	assert.equal(
		stringifyDefinition(definition.enum<number | string>(1, "2")),
		'1|"2"',
	);
});

test("should stringify an object definition", () => {
	assert.equal(
		stringifyDefinition({ id: isString, name: isString }),
		["{", "  id: is$String,", "  name: is$String,", "}"].join("\n"),
	);
});

test("should stringify dictionary", () => {
	assert.equal(
		stringifyDefinition(isString.dictionary),
		"Record<string, is$String>",
	);
});

test("should stringify AND", () => {
	assert.equal(
		stringifyDefinition<unknown>(
			definition.every({ id: isString }, { id: isUUID }),
		),
		[
			"Every {",
			"  {",
			"    id: is$String,",
			"  },",
			"  {",
			"    id: is$UUID,",
			"  },",
			"}",
		].join("\n"),
	);
});

test("should stringify OR", () => {
	assert.equal(
		stringifyDefinition<unknown>(
			definition.some({ id: isString }, { id: isUUID }),
		),
		[
			"Some {",
			"  {",
			"    id: is$String,",
			"  },",
			"  {",
			"    id: is$UUID,",
			"  },",
			"}",
		].join("\n"),
	);
});

test("should stringify circular definition", () => {
	const def: Record<string, Definition> = { key1: isString };
	def.key2 = def;
	assert.equal(
		stringifyDefinition(def),
		["{", "  key1: is$String,", "  key2: (circular),", "}"].join("\n"),
	);
});
