import { createServiceClientProxy } from '@service/utils';
import type { MethodOnlyObject, ServiceClient, SyncReturnType } from '@service/types';

const createLocalServiceClient = <T extends MethodOnlyObject>(controller: T | ServiceClient<T>): ServiceClient<T> =>
  createServiceClientProxy(
    async <K extends keyof T>(property: K, args: Parameters<T[K]>): Promise<SyncReturnType<T[K]>> =>
      controller[property](...args),
    controller as ServiceClient<T>,
  );

export default createLocalServiceClient;
