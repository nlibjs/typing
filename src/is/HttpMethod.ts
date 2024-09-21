import { definition } from "../definition.ts";
import { createTypeChecker } from "../createTypeChecker.ts";
import type { DefinitionEnum, TypeChecker } from "../generics.ts";

export type HttpMethod =
	| "CONNECT"
	| "DELETE"
	| "GET"
	| "HEAD"
	| "OPTIONS"
	| "PATCH"
	| "POST"
	| "PUT"
	| "TRACE";
export const isHttpMethod: TypeChecker<
	HttpMethod,
	string,
	DefinitionEnum<HttpMethod>
> = createTypeChecker<HttpMethod>(
	"HttpMethod",
	definition.enum<HttpMethod>(
		"CONNECT",
		"DELETE",
		"GET",
		"HEAD",
		"OPTIONS",
		"PATCH",
		"POST",
		"PUT",
		"TRACE",
	),
);
