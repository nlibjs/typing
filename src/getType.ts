/**
 * Get the type of the object.
 * @example
 * ```typescript
 * getType(1);    // "Number"
 * getType("a");  // "String"
 * getType([]);   // "Array"
 * getType({});   // "Object"
 * getType(null); // "Null"
 * getType(undefined);   // "Undefined"
 * getType(() => {});    // "Function"
 * getType(new Map());   // "Map"
 * getType(new Set());   // "Set"
 * getType(/[a-z]/);     // "RegExp"
 * getType(new Date());  // "Date"
 * getType(new Error()); // "Error"
 * getType(new Uint32Array(1));   // "Uint32Array"
 * getType(new class MyClass {}); // "MyClass"
 * ```
 */
export const getType: (input: unknown) => string = (
	(objectToString) => (input: unknown) => {
		let result = objectToString.call(input).slice(8, -1);
		if (result === "Object" && (input as object).constructor) {
			result = (input as object).constructor.name;
		}
		return result;
	}
)(Object.prototype.toString);
