import { EventArgs, EventListener, EventNames, PublicEventEmitter } from '@service/types';
import EventEmitter from 'eventemitter3';

export default abstract class AbstractPublicEventEmitter<
  EventTypes extends string | symbol | {} | { [K in keyof EventTypes]: any[] | ((...args: any[]) => void) } =
    | string
    | symbol,
  Context extends any = any
> implements PublicEventEmitter<EventTypes, Context> {
  protected readonly eventEmitter = new EventEmitter();

  /** Add a listener for a given event. */
  public on<T extends EventNames<EventTypes>>(event: T, fn: EventListener<EventTypes, T>, context?: any): this {
    this.eventEmitter.on(event as string | symbol, fn, context);
    return this;
  }

  /** Add a listener for a given event. */
  public addListener<T extends EventNames<EventTypes>>(
    event: T,
    fn: EventListener<EventTypes, T>,
    context?: any,
  ): this {
    this.eventEmitter.addListener(event as string | symbol, fn, context);
    return this;
  }

  /** Add a one-time listener for a given event. */
  public once<T extends EventNames<EventTypes>>(event: T, fn: EventListener<EventTypes, T>, context?: any): this {
    this.eventEmitter.once(event as string | symbol, fn, context);
    return this;
  }

  /** Remove the listeners of a given event. */
  public removeListener<T extends EventNames<EventTypes>>(
    event: T,
    fn?: EventListener<EventTypes, T>,
    context?: any,
    once?: boolean,
  ): this {
    this.eventEmitter.removeListener(event as string | symbol, fn, context, once);
    return this;
  }

  /** Remove the listeners of a given event. */
  public off<T extends EventNames<EventTypes>>(
    event: T,
    fn?: EventListener<EventTypes, T>,
    context?: any,
    once?: boolean,
  ): this {
    this.eventEmitter.off(event as string | symbol, fn, context, once);
    return this;
  }

  /** Emits an event */
  protected emit<T extends EventNames<EventTypes>>(event: T, ...args: EventArgs<EventTypes, T>) {
    this.eventEmitter.emit(event as string | symbol, ...args);
    return this;
  }
}
