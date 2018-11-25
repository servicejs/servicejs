/**
 * Nested Array & flatten
 */

export interface NestedArray<T> extends Array<Nested<T>> {}
export type Nested<T> = T | T[] | NestedArray<T>;

function isArray<T>(item: Nested<T>): item is T[] | NestedArray<T> {
  return item instanceof Array;
}

export function flatten(): [];
export function flatten<T>(arr: T[] | NestedArray<T>): T[];
export function flatten<T>(item: T): [T];
export function flatten<T, A extends NestedArray<T> & any[]>(...arr: A): T[];
export function flatten<T, A extends T[]>(...arr: A): A;
export function flatten<T, A extends NestedArray<T> & any[]>(...items: A): T[] {
  const flattenedArray: T[] = [];
  for (const item of items) {
    if (isArray(item)) {
      flattenedArray.push(...flatten<T>(item));
    } else {
      flattenedArray.push(item);
    }
  }

  return flattenedArray;
}
