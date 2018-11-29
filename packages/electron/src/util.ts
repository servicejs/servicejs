/**
 * Utility map types
 */

export type MaybeMap<T> = { [K in keyof T]?: T[K] | undefined };
