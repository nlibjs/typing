import { createTypeChecker } from "../createTypeChecker.mjs";
import { isSafeInteger } from "./SafeInteger.mjs";

export const isNonPositiveSafeInteger = createTypeChecker(
	"NonPositiveSafeInteger",
	(input: unknown): input is number => isSafeInteger(input) && input <= 0,
);
