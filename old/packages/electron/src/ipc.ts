/**
 * Generic IPC protocol helpers
 */

import { BrowserWindow, ipcMain, ipcRenderer } from "electron";

export type IpcListenFunction<T> = (args: T) => void;
export type IpcEmitFunction<T> = (args: T) => void;

export type IpcListenerMap<ChannelArgMap> = {
  [channel in keyof ChannelArgMap]: IpcListenFunction<ChannelArgMap[channel]>
};

export type IpcEmitterMap<ChannelArgMap> = {
  [channel in keyof ChannelArgMap]: IpcEmitFunction<ChannelArgMap[channel]>
};

/**
 * Sends an IPC message to the renderer process of the supplied browser window
 */
export const sendIpcMessageToBrowserWindow = <C extends string, T>(
  browserWindow: BrowserWindow,
  channel: C,
  args: T,
) => {
  browserWindow.webContents.send(channel, args);
};

/**
 * Sends an IPC message to the main process
 */
export const sendIpcMessageToMain = <C extends string, T>(
  channel: C,
  args: T,
) => {
  ipcRenderer.send(channel, args);
};

export const listenToIpcMessageInMain = <C extends string, T>(
  channel: C,
  listener: (event: any, args: T) => void,
) => {
  ipcMain.on(channel, listener);
};

export const listenToIpcMessageInRenderer = <C extends string, T>(
  channel: C,
  listener: (event: any, args: T) => void,
) => {
  ipcRenderer.on(channel, listener);
};

export const IpcEmitter = <ChannelArgMap>(
  channels: Array<keyof ChannelArgMap>,
  send: (channel: string, args: any) => void,
) => {
  const r = {} as IpcEmitterMap<ChannelArgMap>;
  for (const channel of channels) {
    r[channel] = (args: any) => {
      send(channel as string, args);
    };
  }
  return r;
};

export const wrapListener = <T>(f: (args: T) => void) => (_: any, args: T) =>
  f(args);

export const listenToChannels = <ChannelArgMap>(
  listenerMap: IpcListenerMap<ChannelArgMap>,
  listen: (channel: string, listener: (event: any, args: any) => void) => void,
) => {
  // prettier-ignore
  for (const channel of Object.keys(listenerMap) as Array<keyof IpcListenerMap<ChannelArgMap>>) {
    listen(channel as string, wrapListener(listenerMap[channel]));
  }
};

export const MainIpcEmitter = <ChannelArgMap>(
  browserWindow: () => BrowserWindow,
  channels: Array<keyof ChannelArgMap>,
) =>
  IpcEmitter<ChannelArgMap>(channels, (channel, args) =>
    sendIpcMessageToBrowserWindow(browserWindow(), channel, args),
  );

export const RendererIpcEmitter = <ChannelArgMap>(
  channels: Array<keyof ChannelArgMap>,
) =>
  IpcEmitter<ChannelArgMap>(channels, (channel, args) =>
    sendIpcMessageToMain(channel, args),
  );

export const listenToChannelsInMain = <ChannelArgMap>(
  listenerMap: IpcListenerMap<ChannelArgMap>,
) => listenToChannels(listenerMap, listenToIpcMessageInMain);

export const listenToChannelsInRenderer = <ChannelArgMap>(
  listenerMap: IpcListenerMap<ChannelArgMap>,
) => listenToChannels(listenerMap, listenToIpcMessageInRenderer);
