import { isUUIDLowercase } from "@nlib/typing/is/UUIDLowercase";

console.log(
	isUUIDLowercase("123e4567-e89b-12d3-a456-426614174000"),
	isUUIDLowercase("123E4567-E89B-12D3-A456-426614174000"),
);
