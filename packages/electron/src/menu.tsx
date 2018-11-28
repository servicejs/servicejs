/* @jsx h */

import { h, Props } from "@service/jsx";
import { Menu as ElectronMenu, MenuItem as ElectronMenuItem, MenuItemConstructorOptions } from "electron";

export interface MenuProps {
  children?: any[];
}

export const Menu = ({ children = [] }: MenuProps) => <Props children={children.map((c) => c.props)} />;

export interface MenuItemProps extends MenuItemConstructorOptions {
  // children?: MenuItemConstructorOptions[] | MenuItemProps[];
  children?: any[];
}

export const MenuItem = ({ children, ...props }: MenuItemProps) => (
  <Props {...(typeof children !== "undefined" ? { submenu: children.map((c) => c.props) } : {})} {...props} />
);

export const SubMenu = ({
  children = [],
  ...props
}: Pick<MenuItemProps, "children" | "enabled" | "label" | "visible" | "id" | "icon">) => (
  <MenuItem type="submenu" children={children} {...props} />
);

export const Separator = () => <MenuItem type="separator" />;

export type ClickMenuItemProps = Pick<MenuItemProps, "enabled" | "accelerator" | "label"> &
  Required<Pick<MenuItemProps, "id">>;

export const ClickMenuItemFactory = (emitter: (id: string) => void) => (props: ClickMenuItemProps) => (
  <MenuItem {...props} click={() => emitter(props.id)} />
);

export const getMenuItemById = (id: string): ElectronMenuItem | null | undefined => {
  const menu = ElectronMenu.getApplicationMenu();
  if (!menu) {
    return null;
  }
  return menu!.getMenuItemById(id);
};
