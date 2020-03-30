import UnsupportedActionException from './UnsupportedActionException';
import type { Service } from '@service/core';

const errorHandler = (name: string) => () => {
  throw new UnsupportedActionException(`\`${name}\` is not supported on Service proxy objects`);
};

export default function createServiceProxy<T extends object>(
  handler: (property: keyof T, args: any[]) => any,
  proxyBase?: Service<T>,
) {
  return new Proxy<Service<T>>((proxyBase || {}) as Service<T>, {
    get: (target, property: keyof T, receiver) => async (...args: any[]) => handler(property, args),
    set: errorHandler('set'),
    apply: errorHandler('apply'),
    construct: errorHandler('construct'),
    defineProperty: errorHandler('defineProperty'),
    deleteProperty: errorHandler('deleteProperty'),
    enumerate: errorHandler('enumerate'),
    getOwnPropertyDescriptor: errorHandler('getOwnPropertyDescriptor'),
    getPrototypeOf: errorHandler('getPrototypeOf'),
    has: errorHandler('has'),
    isExtensible: errorHandler('isExtensible'),
    ownKeys: errorHandler('ownKeys'),
    preventExtensions: errorHandler('preventExtensions'),
    setPrototypeOf: errorHandler('setPrototypeOf'),
  });
}
