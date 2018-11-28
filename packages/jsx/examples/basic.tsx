/**
 * Basic custom JSX example
 */

/* @jsx h */
// tslint:disable:no-console

import { Component, ElementClass, evalElement, h, IntrinsicElements } from "../src";

const jsx1 = <foo bar={true} />;
console.log(jsx1);

class C extends Component<{ foo: number }> {
  constructor(props: { foo: number }) {
    super(props);
    console.log(props);
  }
  public render() {}
}

const jsx2 = <C foo={1} />;
console.log(jsx2);

const Sfc = ({ bar }: { bar: boolean }) => <foo bar={bar} />;
const jsx3 = <Sfc bar={true} />;
console.log(jsx3);

console.log(evalElement(jsx1));
console.log(evalElement(jsx2));
console.log(evalElement(jsx3));
