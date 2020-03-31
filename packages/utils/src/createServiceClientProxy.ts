import UnsupportedActionException from './UnsupportedActionException';
import type { MethodOnlyObject, ServiceClient, SyncReturnType } from '@service/types';

const errorHandler = (name: string) => () => {
  throw new UnsupportedActionException(`\`${name}\` is not supported on Service proxy objects`);
};

export default function createServiceClientProxy<T extends MethodOnlyObject>(
  sendRequest: <K extends keyof T>(
    property: K,
    args: Parameters<T[K]>,
  ) => ReturnType<T[K]> | Promise<SyncReturnType<T[K]>>,
  proxyBase?: ServiceClient<T>,
) {
  return new Proxy<ServiceClient<T>>((proxyBase || {}) as ServiceClient<T>, {
    get: <K extends keyof T>(target: any, property: K) => async (...args: Parameters<T[K]>) =>
      sendRequest(property, args),
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
