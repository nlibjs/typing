import type { TypeChecker } from "../generics.ts";
import { typeChecker } from "../typing.ts";

export const isArray: TypeChecker<Array<unknown>> = typeChecker(Array.isArray);
