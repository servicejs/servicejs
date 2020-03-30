/**
 * Nested Array & flatten
 */

import { isArray } from "./is";

export interface NestedArray<T> extends Array<Nested<T>> {}
export type Nested<T> = T | T[] | NestedArray<T>;

export function flatten(): [];
export function flatten<T>(arr: T[] | NestedArray<T>): T[];
export function flatten<T>(item: T): [T];
export function flatten<T, A extends NestedArray<T> & any[]>(...arr: A): T[];
export function flatten<T, A extends T[]>(...arr: A): A;
export function flatten<T, A extends NestedArray<T> & any[]>(...items: A): T[] {
  if (items.length === 0) {
    return [];
  }
  if (items.length === 1) {
    return isArray(items[0]) ? flatten(...items[0]) : [items[0]];
  }
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
