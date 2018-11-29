/**
 * Utility map types
 */

export type MaybeMap<T> = { [K in keyof T]: T[K] | undefined };
export type PartialMaybeMap<T> = Partial<MaybeMap<T>>;
export type KeyedMap<K extends string | number | symbol, T> = { [key in K]: T };
