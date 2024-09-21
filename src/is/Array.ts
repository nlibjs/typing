import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeChecker, TypeGuard } from "../generics.ts";
import { is$Array } from "../primitive.private.ts";

export const isArray: TypeChecker<
	unknown[],
	"Array",
	TypeGuard<unknown[]>
> = createTypeChecker("Array", is$Array);
