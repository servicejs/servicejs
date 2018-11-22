/**
 * Encoding & decoding types
 */

export interface Encoder<R, T = any> {
  encode(value: T): R;
}

export interface Decoder<R, T = any> {
  decode(representation: R): T;
}

export type Coder<R, T = any> = Encoder<R, T> & Decoder<R, T>;
