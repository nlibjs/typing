import { createTypeChecker } from "../createTypeChecker.ts";
import { isSafeInteger } from "./SafeInteger.ts";

export const isNonNegativeSafeInteger = createTypeChecker(
	"NonNegativeSafeInteger",
	(input: unknown): input is number => isSafeInteger(input) && 0 <= input,
);
