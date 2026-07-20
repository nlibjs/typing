import { narrow, typeChecker, union } from "@nlib/typing/core";

const isString = (input) => typeof input === "string";
const isNumber = (input) => typeof input === "number";
const isPositive = narrow(isNumber, (input) => 0 < input);
const isCircle = typeChecker(
	{ kind: new Set(["circle"]), radius: isPositive },
	"Circle",
);
const isSquare = typeChecker(
	{ kind: new Set(["square"]), label: isString },
	"Square",
);
const isMessage = typeChecker(
	{ id: isString, shape: union(isCircle, isSquare) },
	"Message",
);
console.log(isMessage({ id: "a", shape: { kind: "circle", radius: 1 } }));
