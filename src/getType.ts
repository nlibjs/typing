export const getType: (object: unknown) => string = (
	(objectToString) => (object: unknown) =>
		objectToString.call(object).slice(8, -1)
)(Object.prototype.toString);
