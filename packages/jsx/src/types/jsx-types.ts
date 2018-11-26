/**
 * JSX types
 */

// tslint:disable:no-empty-interface
// tslint:disable:interface-name

/** Imports */

import { ComponentType } from "./element";

/** Declarations */

/**
 * Class components must create instances that conform to ElementClass
 */
export interface ElementClass extends ComponentType {}

// /**
//  * ElementAttributesProperty should contain a single property name, at which
//  * properties will be stored in JSX class component instances. If none is
//  * provided, the first element of the constructor will be used.
//  */
// export interface ElementAttributesProperty {
//   props;
// }

/**
 * Children attribute within the props, should also contain only a single
 * attribute.
 */
export interface ElementChildrenAttribute {
  children;
}

/**
 * IntrinsicAttributes contains keys used by the JSX framework internally,
 * e.g. `key` in React.
 */
export interface IntrinsicAttributes {}

/**
 * Contains internally used attributes of Class components, e.g. `ref` in React
 */
export interface IntrinsicClassAttributes<T> {}

/**
 * Contains a transformation of provided props, e.g. by providing defaults
 * (TODO: How?)
 */
export interface LibraryManagedAttributes {}
