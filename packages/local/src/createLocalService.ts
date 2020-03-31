import LocalService from './LocalService';
import type { MethodOnlyObject, Service, ServiceClient } from '@service/types';

export const createLocalService = <L extends MethodOnlyObject, R extends MethodOnlyObject>(
  localController: L | ServiceClient<L>,
  remoteController: R | ServiceClient<R>,
): Service<L, R> => new LocalService<L, R>(localController, remoteController);

export default createLocalService;
