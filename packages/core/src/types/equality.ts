/**
 * Equality & equivalence test functions
 */

import { isUndefined } from "../../lib";
import { isNull, isObject } from "./is";
import { not } from "./predicates";

export type EqualityComparator<T, U> = (value1: T, value2: U) => boolean;
export type GenericEqualityComparator = <T, U>(value1: T, value2: U) => boolean;

/** Checks for value equality for value types & identity for reference types (generally, objects) */
export function identityEqual<T>(value1: T, value2: T): boolean;
export function identityEqual<T, U>(value1: T, value2: U): false;
export function identityEqual<T, U>(value1: T, value2: U) {
  return (value1 as any) === (value2 as any);
}

/** Checks for type equality */
export function typeEqual<T, U>(value1: T, value2: U): boolean {
  return typeof value1 === typeof value2;
}

export function needsStructuralComparison<T, U>(value1: T, value2: U) {
  return (
    not(typeEqual(value1, value2)) ||
    not(isObject(value1)) ||
    (isNull(value1) && isNull(value2))
  );
}

/**
 * Accepts a comparator for non-null objects and a comparator for all other
 * values and returns a comparator that will perform the combined check for
 * values of all types
 */
export function comparatorFactory(
  nonNullObjectComparator: GenericEqualityComparator,
  otherValueComparator: GenericEqualityComparator = identityEqual,
): GenericEqualityComparator {
  return <T, U>(value1: T, value2: U) => {
    if (not(typeEqual(value1, value2))) {
      return false;
    }

    if (not(isObject(value1))) {
      return otherValueComparator(value1, value2);
    }

    const value1IsNull = isNull(value1);
    const value2IsNull = isNull(value2);
    if (value1IsNull || value2IsNull) {
      return value1IsNull && value2IsNull;
    }

    return nonNullObjectComparator(value1, value2);
  };
}

/**
 * @internal
 */
export const shallowStructurallyEqualNonNullObjectComparator = <T, U>(
  value1: T,
  value2: U,
) => {
  const keys1 = Object.keys(value1).sort();
  const keys2 = Object.keys(value2).sort();

  const keyCount = keys1.length;

  if (keys1.length !== keys2.length) {
    return false;
  }

  let n = 0;
  while (n < keyCount) {
    if (keys1[n] !== keys2[n]) {
      return false;
    }
    n++;
  }

  return true;
};

/**
 * Checks for type equality & returns true if the values are not objects or
 * both null and otherwise checks for the presence of the same set of keys in
 * both objects
 */
export const shallowStructurallyEqual = comparatorFactory(
  shallowStructurallyEqualNonNullObjectComparator,
  () => true,
);

/**
 * @internal
 */
export const shallowStructurallyTypeEqualNonNullObjectComparator = <T, U>(
  value1: T,
  value2: U,
) => {
  if (not(shallowStructurallyEqualNonNullObjectComparator(value1, value2))) {
    return false;
  }

  const keys = Object.keys(value1);
  for (const key of keys) {
    if (not(typeEqual(value1[key], value2[key]))) {
      return false;
    }
  }

  return true;
};

/**
 * Checks for shallow structural equality and if true, checks for all
 * properties if they are type equal too
 */
export const shallowStructurallyTypeEqual = comparatorFactory(
  shallowStructurallyTypeEqualNonNullObjectComparator,
  () => true,
);

/**
 * @internal
 */
export const deepStructurallyEqualNonNullObjectComparator = <T, U>(
  value1: T,
  value2: U,
) => {
  if (!shallowStructurallyTypeEqualNonNullObjectComparator(value1, value2)) {
    return false;
  }

  const keys = Object.keys(value1);
  for (const key of keys) {
    const prop1 = value1[key];
    const prop2 = value2[key];
    const prop1Type = typeof prop1;
    if (prop1Type === "object" && not(deepStructurallyEqual(prop1, prop2))) {
      return false;
    }
  }

  return true;
};

/**
 * Checks for shallow structural type equality and if true, checks for all
 * properties containing objects if they are deepStructurallyEqual too
 */
export const deepStructurallyEqual = comparatorFactory(
  deepStructurallyEqualNonNullObjectComparator,
  () => true,
);

/**
 * Checks for shallow structural equality and if true, checks for all
 * properties if they are identity-equal for value types and
 * structurallyAndValueEqual for object types
 */
export function structurallyAndValueEqual<T, U>(
  value1: T,
  value2: U,
  comparator: GenericEqualityComparator = comparatorFactory(
    structurallyAndValueEqual,
  ),
) {
  if (!shallowStructurallyEqual(value1, value2)) {
    return false;
  }
  const keys = Object.keys(value1);
  for (const key of keys) {
    if (not(comparator(value1[key], value2[key]))) {
      return false;
    }
  }
  return true;
}

/**
 * Equivalence factory
 */
export const equivalenceFactory = <T, U>(
  ...equivalenceCheckers: Array<(value1: T, value2: U) => boolean>
) => (value1: T, value2: U) => {
  for (const equivalenceChecker of equivalenceCheckers) {
    if (!equivalenceChecker(value1, value2)) {
      return false;
    }
  }

  return true;
};

/**
 * Equivalence checker factory
 *
 * Accepts a value normalizer (e.g. for an angle, a function that normalizes
 * the angle to a value between 0 and 360 degrees) and returns an equivalence
 * checker that compares two such values aftrer normalizing them using the
 * supplied comparator (by default identity-equality)
 */
export const equivalenceCheckerFactory = <T>(
  valueNormalizer: (value: T) => T,
  comparator: GenericEqualityComparator = identityEqual,
) => (value1: T, value2: T) => {
  const normalizedValue1 = valueNormalizer(value1);
  const normalizedValue2 = valueNormalizer(value2);
  return comparator(normalizedValue1, normalizedValue2);
};

/**
 * Accepts an equivalence checker and a property name (or two for a comparison)
 * between types of different structure and returns an equivalence checker that
 * compares the properties in the slots with the provided names using the
 * equivalence checker.
 */
export const propertyEquivalenceCheckerFactory = <
  T,
  Prop1 extends string,
  Prop2 extends string
>(
  equivalenceChecker: (value1: T, value2: T) => boolean,
  prop1: Prop1,
  prop2?: Prop2,
) =>
  isUndefined(prop2)
    ? <T1 extends { [key in Prop1]: T }, T2 extends { [key in Prop1]: T }>(
        value1: T1,
        value2: T2,
      ) => equivalenceChecker(value1[prop1], value2[prop1])
    : <T1 extends { [key in Prop1]: T }, T2 extends { [key in Prop2]: T }>(
        value1: T1,
        value2: T2,
      ) => equivalenceChecker(value1[prop1], value2[prop2]);
