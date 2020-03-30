import { createServiceProxy } from '@service/utils';
import type { Service } from '@service/core';

const createLocalService = <T extends object>(controller: T): Service<T> =>
  createServiceProxy(async (property: keyof T, args: any[]) => {
    if (typeof controller[property] === 'function') {
      return ((controller[property] as unknown) as (...args: any[]) => any)(...args);
    } else {
      return controller[property];
    }
  }, controller as Service<T>);

export default createLocalService;
