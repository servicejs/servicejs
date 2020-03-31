import type { PublicEventEmitter } from './PublicEventEmitter';

/** An object type that only contains methods, no other properties */
export type MethodOnlyObject<T = any> = T extends { [K in keyof T]: (...args: any[]) => any } ? T : never;

export type RePromise<T> = T extends Promise<any> ? T : Promise<T>;
export type UnPromise<T> = T extends Promise<infer U> ? U : T;

export type Sync<F extends (...args: any[]) => any> = ReturnType<F> extends Promise<infer R>
  ? (...args: Parameters<F>) => R
  : F;

export type Async<F extends (...args: any[]) => any> = ReturnType<F> extends Promise<any>
  ? F
  : (...args: Parameters<F>) => Promise<ReturnType<F>>;

export type AsyncReturnType<F extends (...args: any[]) => any> = RePromise<ReturnType<F>>;

export type SyncReturnType<F extends (...args: any[]) => any> = UnPromise<ReturnType<F>>;

/** Wraps all properties of an object type asynchronously. All clients of a service should be of this type. */
export type ServiceClient<T extends MethodOnlyObject> = {
  [K in keyof T]: Async<T[K]>;
};

/** Event types exposed by all services */
export interface ServiceEventMap {
  error: (error: Error) => void;
}

/** Basic service structure */
export interface Service<
  L extends MethodOnlyObject,
  R extends MethodOnlyObject,
  E extends ServiceEventMap = ServiceEventMap
> extends PublicEventEmitter<E> {
  controller: L | ServiceClient<L>;
  client: ServiceClient<R>;
}

export type Client<T extends MethodOnlyObject, E extends ServiceEventMap = ServiceEventMap> = Service<{}, T, E>;

export type Server<T extends MethodOnlyObject> = Service<{}, T, ServiceEventMap>;

export type CreateServiceFunction<E extends ServiceEventMap = ServiceEventMap> = <
  L extends MethodOnlyObject,
  R extends MethodOnlyObject
>(
  controller: L | ServiceClient<L>,
) => Service<L, R, E>;

export type CreateClientFunction<E extends ServiceEventMap = ServiceEventMap> = <
  T extends MethodOnlyObject
>() => Client<T, E>;

export type CreateServerFunction = <T extends MethodOnlyObject>() => Server<T>;
