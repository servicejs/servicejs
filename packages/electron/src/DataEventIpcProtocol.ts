/**
 * MenuItem IPC Protocol
 */

/** Imports */

import { BrowserWindow } from "electron";
import {
  IpcEmitterMap,
  IpcListenerMap,
  listenToChannelsInMain,
  listenToChannelsInRenderer,
  MainIpcEmitter,
  RendererIpcEmitter,
} from "./ipc";

export interface DataEventMap<T, E> {
  data: T;
  event: E;
}

// tslint:disable-next-line:no-namespace
export namespace DataEventIpcProtocol {
  export namespace Main {
    export const listen = <RendererDataEventMap extends DataEventMap<any, any>>(
      listenerMap: IpcListenerMap<RendererDataEventMap>,
    ) => listenToChannelsInMain<RendererDataEventMap>(listenerMap);

    export const Emitter = <MainDataEventMap extends DataEventMap<any, any>>(
      browserWindow: () => BrowserWindow,
      channels: Array<keyof MainDataEventMap> = ["data", "event"],
    ): IpcEmitterMap<MainDataEventMap> =>
      MainIpcEmitter<MainDataEventMap>(browserWindow, channels);
  }

  export namespace Renderer {
    export const listen = <MainDataEventMap extends DataEventMap<any, any>>(
      listenerMap: IpcListenerMap<MainDataEventMap>,
    ) => listenToChannelsInRenderer<MainDataEventMap>(listenerMap);

    export const Emitter = <
      RendererDataEventMap extends DataEventMap<any, any>
    >(
      channels: Array<keyof RendererDataEventMap> = ["data", "event"],
    ): IpcEmitterMap<RendererDataEventMap> =>
      RendererIpcEmitter<RendererDataEventMap>(channels);
  }
}
