import { isHttpsUrlString } from "@nlib/typing/is/HttpsUrlString";

console.log(
	isHttpsUrlString("https://example.com/path"),
	isHttpsUrlString("http://example.com/path"),
);
