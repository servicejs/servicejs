/**
 * Menu components & helper functions
 */

/* @jsx h */

/** Imports */

import { h, Props } from "@service/jsx";
import { Menu as ElectronMenu, MenuItem as ElectronMenuItem, MenuItemConstructorOptions } from "electron";
import { MaybeMap } from "./util";

//
// Types
//

export type MenuItemOptions = Pick<ElectronMenuItem, "checked" | "click" | "enabled" | "label" | "visible">;
export type MenuItemUpdateProps = MaybeMap<MenuItemOptions>;
export type MenuItemOptionMap<MenuItemIds extends string> = MaybeMap<Record<MenuItemIds, MenuItemUpdateProps>>;

//
// Menu
//

export interface MenuProps {
  children?: any[];
}

export const Menu = ({ children = [] }: MenuProps) => <Props children={children.map((c) => c.props)} />;

//
// MenuItem
//

export interface MenuItemProps extends MenuItemConstructorOptions {
  // children?: MenuItemConstructorOptions[] | MenuItemProps[];
  children?: any[];
}

export const MenuItem = ({ children, ...props }: MenuItemProps) => (
  <Props {...(typeof children !== "undefined" ? { submenu: children.map((c) => c.props) } : {})} {...props} />
);

//
// SubMenu
//

export const SubMenu = ({
  children = [],
  ...props
}: Pick<MenuItemProps, "children" | "enabled" | "label" | "visible" | "id" | "icon">) => (
  <MenuItem type="submenu" children={children} {...props} />
);

//
// Separator
//

export const Separator = () => <MenuItem type="separator" />;

//
// ClickMenuItem
//

export type ClickMenuItemProps = Pick<MenuItemProps, "enabled" | "accelerator" | "label" | "visible"> &
  Required<Pick<MenuItemProps, "id">>;

export const ClickMenuItemFactory = (emitter: (id: string) => void) => (props: ClickMenuItemProps) => (
  <MenuItem {...props} click={() => emitter(props.id)} />
);

//
// getMenuItemById
//

export const getMenuItemById = (id: string): ElectronMenuItem | null | undefined => {
  const menu = ElectronMenu.getApplicationMenu();
  if (!menu) {
    return null;
  }
  return menu!.getMenuItemById(id);
};

//
// dispatchActionById
//

/**
 * Creates a handler function that accepts an ID and dispatches the
 * corresponding action from the supplied map of handlers. If an ID does not
 * have a handler, nothing happens.
 *
 * @param handlerMap A map with events / actions to dispatch, indexed by the IDs of the action
 */
export const dispatchActionById = <ActionIds extends string | number | symbol>(
  handlerMap: { [Id in ActionIds]?: (() => void) | ((id: Id) => void) | undefined },
) => <Id extends ActionIds>(id: Id) => {
  const handler = handlerMap[id];

  // If no handler corrsponding to the ID exists, do nothing
  if (!handler) {
    return;
  }

  // If found, run the handler
  (handler as (id: Id) => void)(id);
};
