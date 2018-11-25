/**
 * An EventEmitter class built around EventEmitter3 with better typing
 */

/** Imports */

// tslint:disable-next-line:no-var-requires
const EventEmitter3 = require("eventemitter3");

/**
 * An EventEmitter class built around EventEmitter3 with better typing
 */
export class EventEmitter<
  T extends { [key in KAll]: any[] },
  KAll extends keyof T = keyof T
> extends EventEmitter3 {
  public static prefixed: string | boolean;

  /**
   * Return an array listing the events for which the emitter has registered
   * listeners.
   */
  public eventNames<K extends KAll>(): K[] {
    return super.eventNames();
  }

  /**
   * Return the listeners registered for a given event.
   */
  public listeners<K extends KAll>(event: K): Array<ListenerFn<T[K]>> {
    return super.listeners(event);
  }

  /**
   * Return the number of listeners listening to a given event.
   */
  public listenerCount<K extends KAll>(event: K): number {
    return super.listenerCount(event);
  }

  /**
   * Calls each of the listeners registered for a given event.
   */
  public emit<K extends KAll>(event: K, ...args: T[K]): boolean {
    return super.emit(event, ...args);
  }

  /**
   * Add a listener for a given event.
   */
  public on<K extends KAll>(
    event: K,
    fn: ListenerFn<T[K]>,
    context?: any,
  ): this {
    return super.on(event, fn, context);
  }

  /**
   * Add a listener for a given event.
   */
  public addListener<K extends KAll>(
    event: K,
    fn: ListenerFn<T[K]>,
    context?: any,
  ): this {
    return super.addListener(event, fn, context);
  }

  /**
   * Add a one-time listener for a given event.
   */
  public once<K extends KAll>(
    event: K,
    fn: ListenerFn<T[K]>,
    context?: any,
  ): this {
    return super.once(event, fn, context);
  }

  /**
   * Remove the listeners of a given event.
   */
  public removeListener<K extends KAll>(
    event: K,
    fn?: ListenerFn<T[K]>,
    context?: any,
    once?: boolean,
  ): this {
    return super.removeListener(event, fn, context, once);
  }

  /**
   * Remove the listeners of a given event.
   */
  public off<K extends KAll>(
    event: K,
    fn?: ListenerFn<T[K]>,
    context?: any,
    once?: boolean,
  ): this {
    return super.off(event, fn, context, once);
  }

  /**
   * Remove all listeners, or those of the specified event.
   */
  public removeAllListeners<K extends KAll>(event?: K): this {
    return super.removeAllListeners(event);
  }
}

export type ListenerFn<T extends any[]> = (...args: T) => void;
