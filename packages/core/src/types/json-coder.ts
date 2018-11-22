/**
 * JSON Encoder & decoder
 */

/** Imports */

import { Coder } from "./coding";

export interface JsonCoderProps {
  replacer?: (key: string, value: any) => any;
  space?: string | number;
  reviver?: (key: any, value: any) => any;
}

export class JsonCoder implements Coder<string> {
  public props: JsonCoderProps;

  constructor(props: JsonCoderProps = {}) {
    this.props = props;
  }

  public encode(
    value: any,
    replacer: undefined | ((key: string, value: any) => any) = this.props
      .replacer,
    space: undefined | string | number = this.props.space,
  ): string {
    return JSON.stringify(value, replacer, space);
  }

  public decode(
    encodedValue: string,
    reviver: undefined | ((key: string, value: any) => any) = this.props
      .reviver,
  ) {
    return JSON.parse(encodedValue, reviver);
  }
}
