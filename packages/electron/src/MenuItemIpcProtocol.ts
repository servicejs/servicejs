/**
 * MenuItem IPC Protocol
 */

/** Imports */

import { BrowserWindow, MenuItem } from "electron";
import {
  IpcEmitterMap,
  IpcListenerMap,
  listenToChannelsInMain,
  listenToChannelsInRenderer,
  MainIpcEmitter,
  RendererIpcEmitter,
} from "./ipc";
import { getMenuItemById } from "./menu";

export type MaybeMap<T> = { [K in keyof T]: T[K] | undefined };
export type MaybePartialMap<T> = Partial<MaybeMap<T>>;
export type MenuItemUpdateProps = MaybePartialMap<
  Pick<MenuItem, "checked" | "click" | "enabled" | "label" | "visible">
>;
export type KeyedMap<K extends string | number | symbol, T> = { [key in K]: T };
export type MenuItemOptionMap<MenuItemIds extends string> = MaybePartialMap<
  KeyedMap<MenuItemIds, MenuItemUpdateProps>
>;

// tslint:disable-next-line:no-namespace
export namespace MenuItemIpcProtocol {
  interface MainListenerArgMap<MenuItemIds extends string> {
    updateMenuItems: { [id in MenuItemIds]?: Partial<MenuItemUpdateProps> };
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
    ): IpcEmitterMap<EmitterArgMap<MenuItemIds>> =>
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
    export const Emitter = <MenuItemIds extends string>(): IpcEmitterMap<
      EmitterArgMap<MenuItemIds>
    > => RendererIpcEmitter<EmitterArgMap<MenuItemIds>>(["updateMenuItems"]);
  }
}

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

/**
 * Creates a handler function that accepts an ID and dispatches the
 * corresponding action from the supplied map of handlers. If an ID does not
 * have a handler, nothing happens.
 *
 * @param handlerMap A map with events / actions to dispatch, indexed by the IDs of the action
 */
export const dispatchActionById = <ActionIds extends string | number | symbol>(
  handlerMap: {
    [Id in ActionIds]?: (() => void) | ((id: Id) => void) | undefined
  },
) => <Id extends ActionIds>(id: Id) => {
  const handler = handlerMap[id];

  // If no handler corrsponding to the ID exists, do nothing
  if (!handler) {
    return;
  }

  // If found, run the handler
  (handler as (id: Id) => void)(id);
};
