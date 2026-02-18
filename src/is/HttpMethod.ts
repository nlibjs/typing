import { typeChecker } from "../typeChecker.ts";
import type { TypeChecker, ValueOf } from "../types.ts";

/** Constants for HTTP methods. */
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
} as const satisfies Record<string, string>;

/** An HTTP method. */
export type HttpMethod = ValueOf<typeof HttpMethod>;

/**
 * @param input A value to check.
 * @returns A type predicate for `HttpMethod`.
 */
export const isHttpMethod: TypeChecker<HttpMethod> = typeChecker<HttpMethod>(
	new Set(Object.values(HttpMethod)),
	"HttpMethod",
);
