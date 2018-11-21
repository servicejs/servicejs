/**
 * Predicate types, boolean combinators & helpers
 */

// tslint:disable:unified-signatures

export type Predicate<A extends any[]> = (...args: A) => boolean;
export type AnyPredicate = (...args: any[]) => boolean;

export type AlwaysPredicate<A extends any[] = any[]> = (...args: A) => true;
export const always: AlwaysPredicate = (...args: any[]) => true;
export type NeverPredicate<A extends any[] = any[]> = (...args: A) => false;
export const never: NeverPredicate = (...args: any[]) => false;

export type TypePredicate<T, U extends T> = (value: T) => value is U;
export type AnyTypePredicate<T> = (value: any) => value is T;

export type NullaryPredicate = () => boolean;

export type UnaryPredicate<T> = (value: T) => boolean;
export type AnyUnaryPredicate = (value: any) => boolean;

export type BinaryPredicate<T1, T2> = (a: T1, b: T2) => boolean;
export type AnyBinaryPredicate = (a: any, b: any) => boolean;

export type TertiaryPredicate<T1, T2, T3> = (a: T1, b: T2, c: T3) => boolean;
export type AnyTertiaryPredicate = (a: any, b: any, c: any) => boolean;

// Boolean combinators

export function not(a: boolean) {
  return !a;
}

export function and(): true;
// tslint:disable-next-line:unified-signatures
export function and(...args: Array<true>): true;
// tslint:disable-next-line:unified-signatures
export function and(...args: boolean[]): false;
export function and(...args: boolean[]) {
  for (const arg of args) {
    if (!arg) {
      return false;
    }
  }
  return true;
}

export function or(): false;
export function or(...args: Array<false>): false;
export function or(...args: boolean[]): true;
export function or(...args: boolean[]) {
  for (const arg of args) {
    if (arg) {
      return true;
    }
  }
  return false;
}

// Predicate combinators

export function all<A extends any[]>(): (...args: A) => true;
export function all<A extends any[]>(
  ...predicates: Array<(...args: A) => true>
): (...args: A) => true;
export function all<P extends Predicate<A>, A extends any[]>(
  ...predicates: P[]
): P;
export function all<P extends Predicate<A>, A extends any[]>(
  ...predicates: P[]
): P {
  return ((...args: A) => {
    for (const predicate of predicates) {
      if (!predicate(...args)) {
        return false;
      }
    }
    return true;
  }) as P;
}

export function any<A extends any[]>(): (...args: A) => false;
// tslint:disable-next-line:unified-signatures
export function any<A extends any[]>(
  ...predicates: Array<(...args: A) => false>
): (...args: A) => false;
export function any<P extends Predicate<A>, A extends any[]>(
  ...predicates: P[]
): P;
export function any<P extends Predicate<A>, A extends any[]>(
  ...predicates: P[]
): P {
  return ((...args: A) => {
    for (const predicate of predicates) {
      if (predicate(...args)) {
        return true;
      }
    }
    return false;
  }) as P;
}
