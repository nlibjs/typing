import { typeChecker as rootTypeChecker } from "@nlib/typing";
import {
	type Guarded,
	type TypeChecker,
	type TypeGuard,
	typeChecker,
	union,
	validate,
} from "@nlib/typing/core";
import {
	isUUIDLowercase,
	type UUIDLowercase,
} from "@nlib/typing/is/UUIDLowercase";

type Equal<A, B> =
	(<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
		? true
		: false;
type Expect<T extends true> = T;

const isPayload = typeChecker({ id: isUUIDLowercase }, "Payload");
type Payload = Guarded<typeof isPayload>;
type _PayloadInference = Expect<Equal<Payload, { readonly id: UUIDLowercase }>>;

const _payloadChecker: TypeChecker<Payload> = isPayload;
const _rootCompatibility: typeof typeChecker = rootTypeChecker;
const result = validate(
	{ id: "123e4567-e89b-12d3-a456-426614174000" },
	isPayload,
);
if (result.ok) {
	const _id: UUIDLowercase = result.value.id;
}

const isFallback = (input: unknown): input is "fallback" =>
	input === "fallback";
const combined: TypeGuard<UUIDLowercase | "fallback"> = union(
	isUUIDLowercase,
	isFallback,
);
void combined;
