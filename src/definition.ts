import {
	isDefinitionCandidates,
	isDefinitionConditions,
} from "./definition.private.ts";
import {
	DefinitionCandidates,
	DefinitionConditions,
	DefinitionEnum,
} from "./generics.ts";
import type { Definition } from "./generics.ts";

export const definition = {
	enum: <T>(...values: Array<T>): DefinitionEnum<T> => {
		return new DefinitionEnum<T>(values);
	},
	some: <T>(...definitions: Array<Definition<T>>): DefinitionCandidates<T> => {
		const set = new DefinitionCandidates<T>();
		for (const d1 of definitions) {
			for (const d2 of isDefinitionCandidates(d1) ? [...d1] : [d1]) {
				set.add(d2);
			}
		}
		return set;
	},
	every: <T>(...definitions: Array<Definition<T>>): DefinitionConditions<T> => {
		const set = new DefinitionConditions<T>();
		for (const d1 of definitions) {
			for (const d2 of isDefinitionConditions(d1) ? [...d1] : [d1]) {
				set.add(d2);
			}
		}
		return set;
	},
};
