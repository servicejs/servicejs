/**
 * Basic custom JSX example
 */

/* @jsx h */
// tslint:disable:no-console

import { ElementClass, evalElement, h } from "../src";

const jsx1 = <foo bar={true} />;
console.log(jsx1);

class C implements ElementClass {
  constructor(props: { foo: number }) {
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
