/**
 * The set of intrinsically known JSX tags/strings and their props types
 */
export interface IntrinsicElements {
  foo: { bar: boolean; baz?: string; children?: [] };
}

export type IntrinsicElementSelectors = keyof IntrinsicElements;
export type IntrinsicPropsType<
  SEL extends IntrinsicElementSelectors
> = IntrinsicElements[SEL];
