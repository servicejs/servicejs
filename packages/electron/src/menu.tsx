/* @jsx h */

import { Component, h } from "@service/jsx";
import { MenuItemConstructorOptions } from "electron";

export interface MenuItemProps extends MenuItemConstructorOptions {
  children?: MenuItemConstructorOptions[] | MenuItemProps[];
}

export class Menu extends Component<Pick<MenuItemProps, "children">> {
  public props: Pick<MenuItemProps, "children">;
}

// tslint:disable-next-line:max-classes-per-file
export class MenuItem extends Component<MenuItemProps> {
  public props: MenuItemProps;
  constructor(props: MenuItemProps) {
    super(props);
  }
}

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
