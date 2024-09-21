import { createTypeChecker } from "../createTypeChecker.ts";
import { is$Object } from "../primitive.private.ts";

export const isObject = createTypeChecker("Object", is$Object);
