import { createTypeChecker } from "../createTypeChecker.ts";
import { is$Array } from "../primitive.private.ts";

export const isArray = createTypeChecker("Array", is$Array);
