export type ValidEventTypes<T = any> = string | symbol | T extends {
  [K in keyof T]: any[] | ((...args: any[]) => void);
}
  ? T
  : never;

export type EventNames<T extends ValidEventTypes> = T extends string | symbol ? T : keyof T;

export type Handler<T extends any[] | ((...args: any[]) => R), R = any> = T extends any[] ? (...args: T) => R : T;

export type EventListener<T extends ValidEventTypes, K extends EventNames<T>> = T extends string | symbol
  ? (...args: any[]) => void
  : K extends keyof T
  ? Handler<T[K], void>
  : never;

export type EventArgs<T extends ValidEventTypes, K extends EventNames<T>> = Parameters<EventListener<T, K>>;

/** Minimal `EventEmitter` interface that is molded against the Node.js `EventEmitter` interface. */
export interface PublicEventEmitter<
  EventTypes extends string | symbol | {} | { [K in keyof EventTypes]: any[] | ((...args: any[]) => void) } =
    | string
    | symbol,
  Context extends any = any
> {
  /** Add a listener for a given event. */
  on<T extends EventNames<EventTypes>>(event: T, fn: EventListener<EventTypes, T>, context?: Context): this;
  /** Add a listener for a given event. */
  addListener<T extends EventNames<EventTypes>>(event: T, fn: EventListener<EventTypes, T>, context?: Context): this;
  /** Add a one-time listener for a given event. */
  once<T extends EventNames<EventTypes>>(event: T, fn: EventListener<EventTypes, T>, context?: Context): this;
  /** Remove the listeners of a given event. */
  removeListener<T extends EventNames<EventTypes>>(
    event: T,
    fn?: EventListener<EventTypes, T>,
    context?: Context,
    once?: boolean,
  ): this;
  /** Remove the listeners of a given event. */
  off<T extends EventNames<EventTypes>>(
    event: T,
    fn?: EventListener<EventTypes, T>,
    context?: Context,
    once?: boolean,
  ): this;
}
