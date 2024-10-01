import * as assert from "node:assert";
import {
	typeChecker,
	ensure,
	isString,
	isPositiveSafeInteger,
	isArrayOf,
	isDictionaryOf,
	isOptionalOf,
} from "./src/mod.ts";

// For example, there is a interface named User.
interface User {
	id: number;
	name: string;
}

// You can create a TypeChecker for User with typeChecker().
const isUser = typeChecker({
	id: isPositiveSafeInteger,
	name: isString,
});
// typeChecker<T>() returns TypeChecker<T> which is a type guard for T.
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
// i.e. TypeChecker<User> is (value: unknown) => value is User
assert.equal(isUser({ id: 1, name: "a" }), true);
assert.equal(isUser({ id: "1", name: "a" }), false);

// You can handle a response with confidence using ensure().
const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
const member = ensure(await response.json(), isUser);
console.info(`member.id: ${member.id}`);
console.info(`member.name: ${member.name}`);

// isArrayOf returns TypeChecker<Array<T>>.
const isUserArray = isArrayOf(isUser);
assert.equal(
	isUserArray([
		{ id: 1, name: "a" },
		{ id: 2, name: "b" },
		{ id: 3, name: "c" },
	]),
	true,
);

// isDictionaryOf returns TypeChecker<Record<string, T>>.
const isUserDictionary = isDictionaryOf(isUser);
assert.equal(
	isUserDictionary({
		a: { id: 1, name: "a" },
		b: { id: 2, name: "b" },
		c: { id: 3, name: "c" },
	}),
	true,
);

// isOptionalOf returns TypeChecker<T | undefined>.
const isItem = typeChecker({
	id: isPositiveSafeInteger,
	name: isOptionalOf(isString),
});
assert.equal(isItem({ id: 1 }), true);
assert.equal(isItem({ id: 1, name: "a" }), true);
assert.equal(isItem({ id: 1, name: 1 }), false);

// Example: Tree structure
interface Node {
	id: string;
	children?: Array<Node>;
}
const isNode = typeChecker({
	// You can use regular expression for defining a string pattern.
	id: /^[0-9a-z]+$/,
	// You can't use isNode here because isNode is not defined yet.
	// Use getter for recursive type definition.
	get children() {
		return isOptionalOf(isArrayOf(isNode));
	},
});
assert.equal(isNode({ id: "a" }), true);
assert.equal(isNode({ id: "a", children: [] }), true);
assert.equal(isNode({ id: "a", children: [{ id: "b" }] }), true);
assert.equal(
	isNode({ id: "a", children: [{ id: "b", children: [{ id: "c" }] }] }),
	true,
);
assert.equal(
	isNode({ id: "a", children: [{ id: "b", children: [{ id: "C" }] }] }),
	// id: "C" is invalid because it is not lowercase.
	false,
);
