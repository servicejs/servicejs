/**
 * The set of intrinsically known JSX tags/strings and their props types
 */

// tslint:disable-next-line:no-empty-interface
export interface IntrinsicElements {}

export type IntrinsicElementSelectors = keyof IntrinsicElements;
export type IntrinsicPropsType<
  SEL extends IntrinsicElementSelectors
> = IntrinsicElements[SEL];
