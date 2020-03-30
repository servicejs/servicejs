/** Makes functions asynchronous and exposes constant values as functions */
export type ServiceField<T> = T extends (...args: any[]) => any
  ? (...args: Parameters<T>) => ReturnType<T> extends Promise<any> ? ReturnType<T> : Promise<ReturnType<T>>
  : () => Promise<T>;

/** Wraps all properties of an object type asynchronously. All services should be of this type. */
export type Service<T extends object> = {
  [K in keyof T]: ServiceField<T[K]>;
};
