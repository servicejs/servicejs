import { AbstractPublicEventEmitter } from '@service/utils';
import createLocalServiceClient from './createLocalServiceClient';
import type { MethodOnlyObject, Service, ServiceClient, ServiceEventMap } from '@service/types';

export default class LocalService<L extends MethodOnlyObject, R extends MethodOnlyObject>
  extends AbstractPublicEventEmitter<ServiceEventMap>
  implements Service<L, R> {
  public client: ServiceClient<R>;

  constructor(public controller: L | ServiceClient<L>, remoteController: R | ServiceClient<R>) {
    super();
    this.client = createLocalServiceClient(remoteController);
  }
}
