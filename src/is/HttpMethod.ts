import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker, ValueOf } from "../types.ts";

export const HttpMethod = {
	CONNECT: "CONNECT",
	DELETE: "DELETE",
	GET: "GET",
	HEAD: "HEAD",
	OPTIONS: "OPTIONS",
	PATCH: "PATCH",
	POST: "POST",
	PUT: "PUT",
	TRACE: "TRACE",
} as const;
export type HttpMethod = ValueOf<typeof HttpMethod>;
export const isHttpMethod: TypeChecker<HttpMethod> = typeChecker<HttpMethod>(
	new Set(Object.values(HttpMethod)),
	"HttpMethod",
);
