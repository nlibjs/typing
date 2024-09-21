import { createTypeChecker } from "../createTypeChecker.ts";
import { isSafeInteger } from "./SafeInteger.ts";

export const isNonPositiveSafeInteger = createTypeChecker(
	"NonPositiveSafeInteger",
	(input: unknown): input is number => isSafeInteger(input) && input <= 0,
);
