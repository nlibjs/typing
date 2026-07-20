import { isEmailAddress } from "@nlib/typing/is/EmailAddress";

console.log(
	isEmailAddress("local@example.com"),
	isEmailAddress("local@localhost"),
);
