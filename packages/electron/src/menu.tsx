/* @jsx h */

import { h } from "@service/jsx";
import { MenuItemConstructorOptions } from "electron";

export interface MenuItemProps extends MenuItemConstructorOptions {
  children?: MenuItemConstructorOptions[] | MenuItemProps[];
}

export const Menu = ({ children }: Pick<MenuItemProps, "children">): MenuItemConstructorOptions[] => children as any[];

export const MenuItem = ({ children, ...props }: MenuItemProps): MenuItemConstructorOptions => ({
  submenu: children,
  ...props,
});

export const Separator = () => <MenuItem type="separator" />;

export const SubMenu = ({
  children = [],
  ...props
}: Pick<MenuItemProps, "children" | "enabled" | "label" | "visible" | "id" | "icon">) => (
  <MenuItem type="submenu" children={children} {...props} />
);

export type ClickMenuItemProps = Pick<MenuItemProps, "enabled" | "accelerator" | "label"> &
  Required<Pick<MenuItemProps, "id">>;

export const ClickMenuItemFactory = (emitter: (id: string) => void) => (props: ClickMenuItemProps) => (
  <MenuItem {...props} click={() => emitter(props.id)} />
);
