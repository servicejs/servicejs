/**
 * JSX Element type and related helpers
 */

// tslint:disable:no-empty-interface

import {
  IntrinsicElementSelectors,
  IntrinsicPropsType,
} from "./intrinsic-elements";

export type JsxType<P = any> = IntrinsicElementSelectors | ComponentType<P>;
export type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;

//
// JsxElement
//

/** Base element type */
export interface JsxElement<P> {
  type: IntrinsicElementSelectors | FunctionComponent<P> | ComponentClass<P>;
  props: P;
}

//
// Intrinsic Element type
//

/** Intrinsic element base type */
export interface IntrinsicElement<SEL extends IntrinsicElementSelectors>
  extends JsxElement<IntrinsicPropsType<SEL>> {
  type: SEL;
}

export type AnyIntrinsicElement = IntrinsicElement<IntrinsicElementSelectors>;

//
// FunctionComponentElement
//

/** Function Components are functions that return Element objects */
export type FunctionComponent<P> = (props: P) => Element;
export type FC<P> = FunctionComponent<P>;
// prettier-ignore
export type FunctionComponentPropsType<F extends FC<any>> = F extends FC<infer P> ? P : never;

/** An SFC element contains the SFC function and the props as a kind of stored macro invokation */
export interface FunctionComponentElement<P> extends JsxElement<P> {
  type: FunctionComponent<P>;
}

//
// ComponentClass / ClassElement
//

export class Component<P> {
  /** @internal */
  // tslint:disable-next-line:variable-name
  private static readonly __isClass = Object.freeze({});

  protected readonly props: P;

  constructor(props: P) {
    this.props = props;
  }
}
Object.freeze(Component);

export const shouldConstruct = (componentType: any) => {
  const prototype = componentType.prototype;
  return !!(prototype && prototype.__isClass);
};

export const isFunctionComponent = (componentType: any) =>
  typeof componentType === "function" && !shouldConstruct(componentType);

/** A component class is a class / a function you can with new that returns a ElementClass value */
export interface ComponentClass<P> {
  new (props: P): Component<P> & InstanceType<this>;
}

export type ComponentClassPropsType<
  C extends ComponentClass<any>
> = C extends ComponentClass<infer P> ? P : never;

/** A class element contains the class to be constructed and the props to be used */
export interface ComponentElement<P> extends JsxElement<P> {
  type: ComponentClass<P>;
}

//
// Element evaluation
//

// prettier-ignore
export function evalElement(element: IntrinsicElement<IntrinsicElementSelectors>): IntrinsicElementSelectors;
// prettier-ignore
export function evalElement<F extends FunctionComponentElement<any>>(element: F): ReturnType<F["type"]>;
// prettier-ignore
export function evalElement<C extends ComponentElement<any>>(element: C): InstanceType<C["type"]>;
// prettier-ignore
export function evalElement(element: JsxElement<any>): any;
export function evalElement(element: JsxElement<any>) {
  const propsTypeIsUndefined = typeof element.props === "undefined";
  const elementType = typeof element.type;
  const elementTypeIsString = elementType === "string";
  const elementTypeIsFunction = elementType === "function";
  const elementTypeIsNeitherStringOrFunction =
    !elementTypeIsString && !elementTypeIsFunction;

  if (propsTypeIsUndefined || elementTypeIsNeitherStringOrFunction) {
    return element;
  }

  if ("children" in element.props) {
    element.props.children = element.props.children.map(evalElement);
  }
  // Intrinsic
  if (typeof element.type === "string") {
    return element.type;
  }

  // Function component
  if (isFunctionComponent(elementType)) {
    // Functional component
    const result = (element.type as any)(element.props);
    return evalElement(result);
  }

  // Class component
  return new (element.type as any)(element.props);
}
