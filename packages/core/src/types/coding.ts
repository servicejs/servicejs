import { IClass } from "./function";

export interface Encodable<T extends object> {
  encode(): T;
}

export interface Decodable extends IClass<any, any> {
  initFromDecoded<T>(decodedData: T): InstanceType<this>;
}

export interface Encoder<E> {
  encode<T extends object>(value: Encodable<T>): E;
}

export interface Decoder<E> {
  decode<T extends object>(encodedValue: E): T;
}

export interface Coder<E> extends Encoder<E>, Decoder<E> {}

export class JSONEncoder implements Coder<string> {
  public encode(value: Encodable<any>): string {
    if (typeof value === "object") {
      return value.encode();
    } else {
      return JSON.stringify(value);
    }
  }

  public decode(encodedValue: string) {
    return JSON.parse(encodedValue);
  }
}
