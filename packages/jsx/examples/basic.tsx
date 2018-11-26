/**
 * Basic custom JSX example
 */

/* @jsx h */
// tslint:disable:no-console

import { ComponentClass, ElementType, h } from "../src";

const jsx1 = <foo bar={true} />;
console.log(jsx1);

// class C implements ComponentClass<{}, any> {
//   constructor(props: {}) {
//     //
//   }
//   public render() {
//     //
//   }
// }

// const jsx2 = <C />;
// console.log(jsx2);

const Sfc = ({ bar }: { bar: boolean }) => <foo bar={bar} />;

const jsx3 = <Sfc bar={true} />;
console.log(jsx3);

// const FF = () => ({ render() {} });

// const jsx4 = <FF />;
// console.log(jsx4);
