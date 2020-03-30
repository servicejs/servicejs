/**
 * Removes duplicate values from an array
 */
export function unique<T>(arr: T[]) {
  return Array.from(new Set(arr));
}
