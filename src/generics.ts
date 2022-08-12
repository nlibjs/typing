export type Nominal<K, T extends string> = K & {
    __brand: T,
    toString: () => string,
};
export type Resolved<T> = T extends Promise<infer S> ? S : T;
export type ValueOf<T> = T[keyof T];
export type SetItem<T> = T extends Set<infer I> ? I : never;
export type MapKey<T> = T extends Map<infer I, unknown> ? I : never;
export type MapValue<T> = T extends Map<unknown, infer I> ? I : never;
export type ArrayItem<T extends Array<unknown>> = T[number];
export interface Callable<Return = unknown> {
    (...args: Array<unknown>): Return,
}
export type RequiredKeys<T> = {[P in keyof T]: undefined extends T[P] ? never : P}[keyof T];
export type OptionalKeys<T> = {[P in keyof T]: undefined extends T[P] ? P : never}[keyof T];
export type UndefinedAsOptional<T extends object> = {[K in OptionalKeys<T>]?: T[K]} & {[K in RequiredKeys<T>]: T[K]};
export type Merge<A, B> = {
    [K in keyof A | keyof B]: K extends keyof B ? B[K] : K extends keyof A ? A[K] : never;
};
export interface TypeGuard<T> {
    (input: unknown): input is T,
    readonly type?: string,
}
type ProcessUndefined<T> = T extends {__brand: string} ? T : T extends object ? UndefinedAsOptional<T> : T;
export type DefinedType<T> = T extends Definition<infer S> ? ProcessUndefined<S> : never;
export type GuardedType<T> = T extends TypeGuard<infer S> ? ProcessUndefined<S> : never;
export interface Dictionary<T> extends Record<string, T> {}
export type DefinitionObject<T> = {
    [K in keyof T]: Definition<T[K]>;
};
export interface TypeChecker<T, N extends string = string> extends TypeGuard<T> {
    readonly name: string,
    readonly type: N,
    readonly array: TypeChecker<Array<T>>,
    readonly optional: TypeChecker<T | undefined>,
    readonly dictionary: TypeChecker<Record<string, T>>,
}
export interface DefinitionEnum<T> extends Iterable<T> {}
export interface DefinitionCandidates<T> extends Iterable<Definition<T>> {}
export interface DefinitionConditions<T> extends Iterable<Definition<Partial<T>>> {}
export type Definition<T = unknown> =
// eslint-disable-next-line @typescript-eslint/sort-type-union-intersection-members
| RegExp
| TypeGuard<T>
| TypeChecker<T>
| DefinitionObject<T>
| DefinitionEnum<T>
| DefinitionCandidates<T>
| DefinitionConditions<T>;
