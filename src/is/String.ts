import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeChecker, TypeGuard } from "../generics.ts";
import { is$String } from "../primitive.private.ts";

export const isString: TypeChecker<
	string,
	TypeGuard<string>
> = createTypeChecker(is$String);
