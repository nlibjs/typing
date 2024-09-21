import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeChecker, TypeGuard } from "../generics.ts";
import { is$Array } from "../primitive.private.ts";

export const isArray: TypeChecker<
	unknown[],
	TypeGuard<unknown[]>
> = createTypeChecker(is$Array);
