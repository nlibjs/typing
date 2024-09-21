import { createTypeChecker } from "../createTypeChecker.ts";
import { is$String } from "../primitive.private.ts";

export const isString = createTypeChecker("String", is$String);
