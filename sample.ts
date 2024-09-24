import type { Nominal } from "./src/generics";
import { isString } from "./src/is/String";

// Define a type
type ItemId = Nominal<string, "ItemId">;
// Create a type guard for the type
const isItemId = defineString<ItemId>((input: unknown): input is ItemId => {
	return /[0-9a-f]{10}/.test(input);
});
// Create a type guard for the object
const isItem = defineObject({
	itemId: isItemId,
	itemName: isString,
});
