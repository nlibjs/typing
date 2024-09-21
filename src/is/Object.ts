import { createTypeChecker } from "../createTypeChecker.ts";
import type { TypeChecker, TypeGuard } from "../generics.ts";
import { is$Object } from "../primitive.private.ts";

export const isObject: TypeChecker<
	Record<string, unknown>,
	"Object",
	TypeGuard<Record<string, unknown>>
> = createTypeChecker("Object", is$Object);
