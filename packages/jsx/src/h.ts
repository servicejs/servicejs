/**
 * h() function & generator
 */

// tslint:disable:no-namespace

/** Imports */

import * as Types from "./types";

//
// h() for intrinsic elements
//

function hIntrinsic<
  SEL extends keyof Types.IntrinsicElements = keyof Types.IntrinsicElements
>(sel: SEL, props: Types.IntrinsicPropsType<SEL>): Types.IntrinsicElement<SEL> {
  return {
    _type: Types.ElementType.Intrinsic,
    props,
    sel,
  };
}

//
// h() for SFC elements
//

function hSFC<F extends Types.SFC<any>>(
  sfc: F,
  props: Types.SFCPropsType<F>,
): Types.SFCElement<F> {
  return {
    _type: Types.ElementType.SFC,
    props,
    sfc,
  };
}

//
// h() for Class elements
//

function hClass<C extends Types.ComponentClass<any, any>>(
  cls: C,
  props: Types.ComponentClassPropsType<C>,
): Types.ClassElement<C> {
  return {
    _type: Types.ElementType.Class,
    class: cls,
    props,
  };
}

//
// h() for factory elements
//

function hFactory<F extends Types.FactoryFunction<any, any>>(
  factory: F,
  props: Types.FactoryFunctionPropsType<F>,
): Types.FactoryElement<F> {
  return {
    _type: Types.ElementType.Factory,
    factory,
    props,
  };
}

//
// Combined h() for use with arbitrary JSX expressions
//

export function h<SEL extends keyof Types.IntrinsicElements>(
  sel: SEL,
  props: Types.IntrinsicElements[SEL],
  ...children: Types.ChildrenType<Types.IntrinsicElements[SEL]>
): Types.IntrinsicElement<SEL>;
export function h<F extends Types.SFC<any>>(
  sfc: F,
  props: Types.SFCPropsType<F>,
  ...children: Types.ChildrenType<Types.SFCPropsType<F>>
): Types.SFCElement<F>;
export function h<C extends Types.ComponentClass<any, any>>(
  cls: C,
  props: Types.ComponentClassPropsType<C>,
  ...children: Types.ChildrenType<Types.ComponentClassPropsType<C>>
): Types.ClassElement<C>;
// export function h<P, R extends Types.ComponentType = Types.ComponentType>(
//   factory: Types.FactoryFunction<P, R>,
//   props: P,
//   ...children: Types.ChildrenType<P>
// ): Types.FactoryElement<P, R>;
export function h<P extends any = any>(
  a: any,
  props: P,
  ...children: Types.ChildrenType<P>
): Types.Element {
  // If no props are passed in JSX, the props object is null, which we replace
  // with the empty object.
  if (props === null) {
    props = {} as P;
  }
  // If the children attribute within the props object is not set and children
  // have been passed as JSX children, the children attribute in the props is
  // set to those children. Otherwise, the JSX children are ignored.
  if (!("children" in props) && children.length > 0) {
    props.children = children;
  }

  // Detection of intrinsic elements
  if (typeof a === "string") {
    return hIntrinsic(a as keyof Types.IntrinsicElements, props as any);
  }

  // Class detection
  if (a.constructor.prototype === a) {
    return hClass(a, props);
  }

  // If the element neither intrinsic nor a class, it's an SFC or factory
  return hSFC(a, props);
}

/**
 * h namespace containing the JSX namespace required for proper typechecking
 */
export namespace h {
  export namespace JSX {
    export type Element = Types.Element;
    // tslint:disable-next-line:no-shadowed-variable
    export type IntrinsicElements = Types.IntrinsicElements;
    export type ElementClass = Types.ElementClass;
    // export type ElementAttributesProperty = types.ElementAttributesProperty;
    export type ElementChildrenAttribute = Types.ElementChildrenAttribute;
    export type IntrinsicAttributes = Types.IntrinsicAttributes;
    // prettier-ignore
    export type IntrinsicClassAttributes<T> = Types.IntrinsicClassAttributes<T>;
    export type LibraryManagedAttributes = Types.LibraryManagedAttributes;
  }
}

export default h;
