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
export type KeyValuePair<T, K extends keyof T = Extract<keyof T, string>> = [K, T[K]];
export interface Callable<Return = unknown> {
    (...args: Array<unknown>): Return,
}
export type RequiredKeys<T> = {[P in keyof T]: undefined extends T[P] ? never : P}[keyof T];
export type OptionalKeys<T> = {[P in keyof T]: undefined extends T[P] ? P : never}[keyof T];
export type Merge<A, B> = {
    [K in keyof A | keyof B]: K extends keyof B ? B[K] : K extends keyof A ? A[K] : never;
};
// eslint-disable-next-line @typescript-eslint/ban-types
export type UndefinedAsOptional<T extends object> = OptionalKeys<T> extends never ? {[K in RequiredKeys<T>]: ProcessUndefined<T[K]>}
    : (
        RequiredKeys<T> extends never ? {[K in OptionalKeys<T>]?: ProcessUndefined<T[K]>}
        : {[K in OptionalKeys<T>]?: ProcessUndefined<T[K]>} & {[K in RequiredKeys<T>]: ProcessUndefined<T[K]>}
    );
export type TypeGuard<T> = (input: unknown) => input is T;
type ProcessUndefined<T> = T extends bigint | number | string | symbol | {__brand: string} | null | undefined ? T
    : T extends Array<infer S> ? Array<S>
    : T extends Set<infer S> ? Set<S>
    : T extends Map<infer S, infer V> ? Map<S, V>
    : T extends object ? UndefinedAsOptional<T> : T;
export type DefinedType<T> = T extends Definition<infer S> ? ProcessUndefined<S> : never;
export type GuardedType<T> = T extends TypeGuard<infer S> ? ProcessUndefined<S> : never;
export interface Dictionary<T> extends Record<string, T> {}
export type DefinitionObject<T> = {
    [K in keyof T]: Definition<T[K]>;
};
export interface TypeChecker<T, N extends string = string, D extends Definition<T> = Definition<T>> extends TypeGuard<T> {
    readonly name: string,
    readonly type: N,
    readonly array: TypeChecker<Array<T>, `Array<${N}>`, TypeGuard<Array<T>>>,
    readonly optional: TypeChecker<T | undefined, `${N}?`, TypeGuard<T | undefined>>,
    readonly dictionary: TypeChecker<Record<string, T>, `Record<string, ${N}>`, TypeGuard<Record<string, T>>>,
    readonly definition: D,
}
export interface DefinitionEnum<T> extends Set<T> {}
export interface DefinitionCandidates<T> extends Set<Definition<T>> {}
export interface DefinitionConditions<T> extends Set<Definition<Partial<T>>> {}
export type Definition<T = unknown> =
// eslint-disable-next-line @typescript-eslint/sort-type-union-intersection-members
| RegExp
| TypeGuard<T>
| DefinitionObject<T>
| DefinitionEnum<T>
| DefinitionCandidates<T>
| DefinitionConditions<T>;
