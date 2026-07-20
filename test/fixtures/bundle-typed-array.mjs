import { isUint8Array } from "@nlib/typing/is/TypedArray";

console.log(isUint8Array(new Uint8Array(1)), isUint8Array(new Uint16Array(1)));
