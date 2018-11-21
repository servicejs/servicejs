/**
 * Function types
 */

// tslint:disable:ban-types

// Basic function types

export type AnyFunctionWithArgumentTupleAndReturnType<A extends any[], R> = (
  ...args: A
) => R;
export type AnyFunctionWithReturnType<
  R
> = AnyFunctionWithArgumentTupleAndReturnType<any[], R>;
export type AnyFunctionWithArgumentTuple<
  A extends any[]
> = AnyFunctionWithArgumentTupleAndReturnType<A, any>;
export type AnyFunction = AnyFunctionWithArgumentTupleAndReturnType<any[], any>;

// Function type helpers

export type ArgumentTupleType<F extends Function> = F extends (
  ...args: infer A
) => any
  ? A
  : never;

// Class interface

export interface IClass<A extends any[], R> {
  new (...args: A): R;
}

// Class constructor type helpers

export type ConstructorType<A extends any[], R> = new (...args: A) => R;

export type ClassConstructorType<
  C extends new (...args: any[]) => any
> = C extends new (...args: infer A) => infer R ? new (...args: A) => R : never;

export type ConstructorToFunction<
  C extends new (...args: any[]) => any
> = C extends new (...args: infer A) => infer R ? (...args: A) => R : never;
export type FunctionToConstructor<
  F extends (...args: any[]) => any
> = F extends (...args: infer A) => infer R ? new (...args: A) => R : never;

export type ConstructorArgumentTupleType<
  C extends new (...args: any[]) => any
> = C extends new (...args: infer A) => any ? A : never;

// Class constructor helpers

// export const classToFunction = <C extends new (...args: any[]) => any>(
//   c: C,
// ) => (...args: ConstructorArgumentTupleType<C>): InstanceType<C> =>
//   new c(...args);

export const functionToClass = <F extends (...args: any[]) => any>(
  f: F,
): new (...args: ArgumentTupleType<F>) => ReturnType<F> =>
  class {
    constructor(...args: ArgumentTupleType<F>) {
      return f(...args);
    }
  } as any;

// Callable class type

export interface CallableClass<A extends any[], R> {
  (...args: A): R;
  new (...args: A): R;
}

export interface CallableClassF<F extends (...args: any[]) => any> {
  (...args: ArgumentTupleType<F>): ReturnType<F>;
  new (...args: ArgumentTupleType<F>): ReturnType<F>;
}

export interface CallableClassC<C extends new (...args: any[]) => any> {
  (...args: ConstructorArgumentTupleType<C>): InstanceType<C>;
  new (...args: ConstructorArgumentTupleType<C>): InstanceType<C>;
}

// callable class function

export const callableClassFromFunction = <F extends (...args: any[]) => any>(
  f: F,
): CallableClassF<F> =>
  // tslint:disable-next-line:only-arrow-functions
  function(...args: ArgumentTupleType<F>) {
    return f(...args);
  } as any;
// export const callableClassFromClass = <C extends new (...args: any[]) => any>(
//   c: C,
// ): CallableClassC<C> =>
//   // tslint:disable-next-line:only-arrow-functions
//   function(...args: ConstructorArgumentTupleType<C>) {
//     return new c(...args);
//   } as any;

// Class or function

export type ClassOrFunctionAR<A extends any[], R> =
  | AnyFunctionWithArgumentTupleAndReturnType<A, R>
  | IClass<A, R>;
export type ClassOrFunctionF<F extends (...args: any[]) => any> =
  | AnyFunctionWithArgumentTupleAndReturnType<
      ArgumentTupleType<F>,
      ReturnType<F>
    >
  | FunctionToConstructor<F>;
export type ClassOrFunctionC<C extends new (...args: any[]) => any> =
  | ClassConstructorType<C>
  | ConstructorToFunction<C>;

// Nullary function

export type NullaryFunction<R> = () => R;
export type AnyNullaryFunction = () => any;

// Nullary class

export type NullaryClass<R> = new () => R;
export type AnyNullaryConstructor = new () => any;

// Unary function

export type UnaryFunction<P, R> = (props: P) => R;
export type AnyUnaryFunctionWithArgument<P> = (props: P) => any;
export type AnyUnaryFunctionWithReturnType<R> = (props: any) => R;
export type AnyUnaryFunction = (props: any) => any;

// Unary function helper

export type UnaryFunctionArgumentType<
  F extends AnyUnaryFunction
> = F extends UnaryFunction<infer P, any> ? P : never;

// Unary class interface

export interface UnaryClass<P, R> {
  new (props: P): R;
}

// Unary class constructor type helpers

export type UnaryConstructorType<P, R> = new (props: P) => R;

export type UnaryClassConstructorType<
  C extends new (props: any) => any
> = C extends new (props: infer P) => infer R ? new (props: P) => R : never;

export type UnaryConstructorToFunction<
  C extends new (props: any) => any
> = C extends new (props: infer P) => infer R ? (props: P) => R : never;
export type UnaryFunctionToConstructor<
  F extends (props: any) => any
> = F extends (props: infer P) => infer R ? new (props: P) => R : never;

export type UnaryConstructorArgumentTuple<
  C extends new (props: any) => any
> = C extends new (props: infer P) => any ? P : never;

// Generator

export type Generator<A extends any[], R> = (...args: A) => IterableIterator<R>;
export type AsyncGenerator<A extends any[], R> = (
  ...args: A
) => AsyncIterableIterator<R>;
