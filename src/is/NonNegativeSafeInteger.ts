import { createTypeChecker } from "../createTypeChecker.mjs";
import { isSafeInteger } from "./SafeInteger.mjs";

export const isNonNegativeSafeInteger = createTypeChecker(
	"NonNegativeSafeInteger",
	(input: unknown): input is number => isSafeInteger(input) && 0 <= input,
);
