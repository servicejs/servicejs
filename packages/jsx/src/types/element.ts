/**
 * JSX Element type and related helpers
 */

// tslint:disable:no-empty-interface

import {
  IntrinsicElementSelectors,
  IntrinsicPropsType,
} from "./intrinsic-elements";

//
// Component base types
//

export type PropsFactoryFunction<P, R> = (props: P) => R;

export interface PropsClass<P, R> {
  new (props: P): R;
}

//
// Children helper types
//

/**
 * A helper interface for props with a children attributes. `C` can be any
 * tuple type.
 */
export interface ChildrenProps<C extends any[] = Element[]> {
  children?: C;
}

/**
 * A helper type for extracting the concrete children type from ChildrenProps
 */
export type ChildrenType<
  P extends ChildrenProps<any[]>
> = P extends ChildrenProps<infer C> ? (C extends any[] ? C : []) : [];

//
// ElementType enum
//

/** An enum containing all supported element types */
export enum ElementType {
  Intrinsic,
  SFC,
  Class,
  Factory,
}

//
// BaseElement
//

/** Base element type */
export interface BaseElement<P> {
  _type: ElementType;
  props: P;
}

//
// Intrinsic Element type
//

/** Intrinsic element base type */
export interface IntrinsicElement<SEL extends IntrinsicElementSelectors>
  extends BaseElement<IntrinsicPropsType<SEL>> {
  _type: ElementType.Intrinsic;
  sel: SEL;
}

export type AnyIntrinsicElement = IntrinsicElement<IntrinsicElementSelectors>;

//
// SFCElement
//

/** Stateless Functional Componennts are functions that return Element objects */
export type SFC<P> = (props: P) => Element;

export type SFCPropsType<F extends SFC<any>> = F extends SFC<infer P>
  ? P
  : never;

/** An SFC element contains the SFC function and the props as a kind of stored macro invokation */
export interface SFCElement<F extends SFC<any>>
  extends BaseElement<SFCPropsType<F>> {
  _type: ElementType.SFC;
  sfc: F;
}

export type AnySFCElement = SFCElement<SFC<any>>;

//
// Component type
//

/** The basic type of all constructed component objects () */
export interface ComponentType {
  render(): void;
}

//
// ComponentClass / ClassElement
//

/** A component class is a class / a function you can with new that returns a ComponentType value */
export interface ComponentClass<P, R extends ComponentType = ComponentType>
  extends PropsClass<P, R> {}

export type ComponentClassPropsType<
  C extends ComponentClass<any, any>
> = C extends ComponentClass<infer P, infer R> ? P : never;

/** A class element contains the class to be constructed and the props to be used */
export interface ClassElement<C extends ComponentClass<any, any>>
  extends BaseElement<ComponentClassPropsType<C>> {
  _type: ElementType.Class;
  class: C;
}

export type AnyClassElement = ClassElement<ComponentClass<any, any>>;

//
// FactoryFunction / FactoryElement
//

/** A factory function is a function return a ComponentType value (directly, without invoking new) */
export type FactoryFunction<
  P,
  R extends ComponentType = ComponentType
> = PropsFactoryFunction<P, R>;

export type FactoryFunctionPropsType<
  F extends FactoryFunction<any, any>
> = F extends FactoryFunction<infer P, infer R> ? P : never;

/** A Factory function element contains the factory function */
export interface FactoryElement<F extends FactoryFunction<any, any>>
  extends BaseElement<FactoryFunctionPropsType<F>> {
  _type: ElementType.Factory;
  factory: F;
}

export type AnyFactoryElement = FactoryElement<FactoryFunction<any, any>>;

//
// Combined Element type
//

// prettier-ignore
export type Element =
    | AnyIntrinsicElement
    | AnySFCElement
    | AnyClassElement
    | AnyFactoryElement;

function evalElement(element: Element): null {
  switch (element._type) {
    case ElementType.Intrinsic:
      return null;
    case ElementType.SFC:
      return evalElement(element.sfc(element.props));
    case ElementType.Class:
      return evalComponent(new element.class(element.props));
    case ElementType.Factory:
      return evalComponent(element.factory(element.props));
  }
}

function evalComponent(component: ComponentType): null {
  return null;
}
