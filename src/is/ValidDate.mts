import { createTypeChecker } from "../createTypeChecker.mjs";
import { getType } from "../getType.mjs";

const isDate = createTypeChecker(
	"Date",
	(input: unknown): input is Date => getType(input) === "Date",
);

export const isValidDate = createTypeChecker(
	"ValidDate",
	(input: unknown): input is Date => isDate(input) && 0 < input.getTime(),
);
