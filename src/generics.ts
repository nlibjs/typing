export type Nominal<K, T extends string> = K & {__brand: T};
export interface Callable {
    (...args: Array<any>): any,
}
export type TypeGuardOf<T> = (input: any) => input is T;
export type ValueOf<T> = T[keyof T];
export type ArrayItemOf<T> = T extends Array<infer I> ? I : never;
export type GuardedTypeOf<T> = T extends TypeGuardOf<infer S> ? S : never;

export interface DefinitionObject<T> extends Record<string, Definition<ValueOf<T>>> {}
export interface DefinitionArray<T> extends ReadonlyArray<Definition<ArrayItemOf<T>>> {}
export interface TypeChecker<T> {
    readonly name: string,
    readonly type: string,
    readonly definition: Definition<T>,
    (input: any): input is T,
}
export interface DefinitionEnum<T> extends Iterable<T> {}
export interface DefinitionCandidates<T> extends Iterable<Definition<T>> {}
export interface DefinitionConditions<T> extends Iterable<Definition<Partial<T>>> {}
export interface DefinitionDictionary<T> {
    definition: Definition<ValueOf<T>>,
}
export type Definition<T> =
| TypeGuardOf<T>
| TypeChecker<T>
| DefinitionObject<T>
| DefinitionArray<T>
| DefinitionEnum<T>
| DefinitionCandidates<T>
| DefinitionConditions<T>
| DefinitionDictionary<T>;
