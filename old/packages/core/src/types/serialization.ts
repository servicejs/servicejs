/**
 * Serialization types
 */

export interface Serializable<T> {
  serialize(): T;
}

export interface Unserializable<T> {
  unserialize(value: T): any;
}
