import { createTypeChecker } from "../createTypeChecker.ts";
import { isSafeInteger } from "./SafeInteger.ts";

export const isNegativeSafeInteger = createTypeChecker(
	"NegativeSafeInteger",
	(input: unknown): input is number => isSafeInteger(input) && input < 0,
);
