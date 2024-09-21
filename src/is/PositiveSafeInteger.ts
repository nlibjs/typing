import { createTypeChecker } from "../createTypeChecker.ts";
import { isSafeInteger } from "./SafeInteger.ts";

export const isPositiveSafeInteger = createTypeChecker(
	"PositiveSafeInteger",
	(input: unknown): input is number => isSafeInteger(input) && 0 < input,
);
