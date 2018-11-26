/**
 * h() function & generator
 */

// tslint:disable:no-empty-interface
// tslint:disable:no-namespace

/** Imports */

import { flatten } from "@service/core/lib/types/nested";
import * as Types from "./types";

/**
 * JSX factory function
 */
export function h<SEL extends keyof Types.IntrinsicElements>(
  sel: SEL,
  props: Types.IntrinsicElements[SEL],
  ...children: Types.ChildrenType<Types.IntrinsicElements[SEL]>
): Types.IntrinsicElement<SEL>;
export function h<P>(
  type: Types.FunctionComponent<P>,
  props: P,
  ...children: Types.ChildrenType<P>
): Types.FunctionComponentElement<P>;
export function h<P>(
  type: Types.ComponentClass<P>,
  props: P,
  ...children: Types.ChildrenType<P>
): Types.ComponentElement<P>;
export function h<P>(
  type: any,
  props: P,
  ...children: Types.ChildrenType<P>
): Types.JsxElement<P> {
  // If no props are passed in JSX, the props object is null, which we replace
  // with the empty object.
  if (props === null) {
    props = {} as P;
  }
  // If the children attribute within the props object is not set and children
  // have been passed as JSX children, the children attribute in the props is
  // set to those children. Otherwise, the JSX children are ignored.
  if (!("children" in props) && children.length > 0) {
    (props as any).children = children;
  }

  if ("children" in props) {
    (props as any).children = flatten((props as any).children);
  }

  return { type, props };
}

/**
 * h namespace containing the JSX namespace required for proper typechecking
 */
export namespace h {
  export namespace JSX {
    export interface Element extends Types.JsxElement<any> {}
    /**
     * Class components must create instances that conform to ElementClass
     */
    export interface ElementClass extends Types.Component {}
    // export interface ElementAttributesProperty extends Types.ElementAttributesProperty {}
    // export interface ElementChildrenAttribute extends Types.ElementChildrenAttribute {}
    export interface IntrinsicAttributes extends Types.IntrinsicAttributes {}
    export interface IntrinsicClassAttributes<T>
      extends Types.IntrinsicClassAttributes<T> {}
    export interface LibraryManagedAttributes
      extends Types.LibraryManagedAttributes {}
    export interface IntrinsicElements extends Types.IntrinsicElements {}
  }
}

export default h;
