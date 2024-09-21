import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeChecker, TypeGuard } from "../generics.ts";
import { is$String } from "../primitive.private.ts";

export const isString: TypeChecker<
	string,
	"String",
	TypeGuard<string>
> = createTypeChecker("String", is$String);
