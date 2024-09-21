import { createTypeChecker } from "../createTypeChecker.mjs";
import { is$Object } from "../primitive.private.mjs";

export const isObject = createTypeChecker("Object", is$Object);
