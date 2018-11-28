/**
 * MenuItem IPC Protocol
 */

/** Imports */

import { BrowserWindow, MenuItem, MenuItemConstructorOptions } from "electron";
import {
  IpcListenerMap,
  listenToChannelsInMain,
  listenToChannelsInRenderer,
  MainIpcEmitter,
  RendererIpcEmitter,
} from "./ipc";
import { getMenuItemById } from "./menu";

// tslint:disable-next-line:no-namespace
export namespace MenuItemIpcProtocol {
  interface MainListenerArgMap<MenuItemIds extends string> {
    updateMenuItems: {
      [id in MenuItemIds]?: Partial<MenuItemConstructorOptions>
    };
  }

  interface RendereristenerArgMap<MenuItemIds extends string> {
    menuItemClick: MenuItemIds;
  }

  export namespace Main {
    export interface ListenerArgMap<MenuItemIds extends string>
      extends MainListenerArgMap<MenuItemIds> {}
    export interface EmitterArgMap<MenuItemIds extends string>
      extends RendereristenerArgMap<MenuItemIds> {}

    export const listen = <MenuItemIds extends string>(
      listenerMap: IpcListenerMap<ListenerArgMap<MenuItemIds>>,
    ) => listenToChannelsInMain<ListenerArgMap<MenuItemIds>>(listenerMap);
    export const Emitter = <MenuItemIds extends string>(
      browserWindow: () => BrowserWindow,
    ) =>
      MainIpcEmitter<EmitterArgMap<MenuItemIds>>(browserWindow, [
        "menuItemClick",
      ]);
  }

  export namespace Renderer {
    export interface ListenerArgMap<MenuItemIds extends string>
      extends RendereristenerArgMap<MenuItemIds> {}
    export interface EmitterArgMap<MenuItemIds extends string>
      extends MainListenerArgMap<MenuItemIds> {}

    export const listen = <MenuItemIds extends string>(
      listenerMap: IpcListenerMap<ListenerArgMap<MenuItemIds>>,
    ) => listenToChannelsInRenderer<ListenerArgMap<MenuItemIds>>(listenerMap);
    export const Emitter = <MenuItemIds extends string>() =>
      RendererIpcEmitter<EmitterArgMap<MenuItemIds>>(["updateMenuItems"]);
  }
}

export type MaybeMap<T> = { [K in keyof T]: T[K] | undefined };
export type MaybePartialMap<T> = Partial<MaybeMap<T>>;
export type MenuItemUpdateProps = MaybePartialMap<
  Pick<MenuItem, "checked" | "click" | "enabled" | "label" | "visible">
>;
export type KeyedMap<K extends string | number | symbol, T> = { [key in K]: T };
export type MenuItemOptionMap<MenuItemIds extends string> = MaybePartialMap<
  KeyedMap<MenuItemIds, MenuItemUpdateProps>
>;

export const updateMenuItems = <MenuItemIds extends string>(
  menuItemOptionMap: MenuItemOptionMap<MenuItemIds>,
) => {
  for (const id of Object.keys(menuItemOptionMap) as Array<
    keyof MenuItemOptionMap<MenuItemIds>
  >) {
    const menuItem = getMenuItemById(id);
    const update = menuItemOptionMap[id];

    // Don't do anything if the menuItem is not found or there is no
    // corresponding update (which shouldn't actually happen)
    if (!menuItem || !update) {
      continue;
    }

    const keys = Object.keys(update!) as Array<keyof MenuItemUpdateProps>;

    for (const key of keys) {
      const updatedValue = update[key];
      // You can pass undefined as a value in the update to delete a key in the menu item (if it exists)
      if (typeof updatedValue === "undefined") {
        if (key in menuItem) {
          delete menuItem[key];
        }
      } else {
        menuItem[key] = updatedValue;
      }
    }
  }
};
