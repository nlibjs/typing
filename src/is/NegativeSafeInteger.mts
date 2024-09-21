import { createTypeChecker } from "../createTypeChecker.mjs";
import { isSafeInteger } from "./SafeInteger.mjs";

export const isNegativeSafeInteger = createTypeChecker(
	"NegativeSafeInteger",
	(input: unknown): input is number => isSafeInteger(input) && input < 0,
);
