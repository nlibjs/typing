import { typeChecker, validate } from "@nlib/typing/core";

const isRecord = typeChecker(
	{ id: (input) => typeof input === "string" },
	"Record",
);
console.log(validate({ id: "ok" }, isRecord).ok);
