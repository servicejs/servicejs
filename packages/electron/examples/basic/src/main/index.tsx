/* @jsx h */

import { evalElement, h } from "@service/jsx";
import { MenuItemConstructorOptions } from "electron";
import {
  ClickMenuItemFactory,
  MainProcessElectronApplication,
  Menu,
  MenuItem,
  MenuItemIpcProtocol,
  Separator,
  SubMenu,
} from "../../../../src";

class MainApp extends MainProcessElectronApplication {
  protected emitter = MenuItemIpcProtocol.Main.Emitter(() => this.mainWindow());

  protected async main() {
    console.log("Hello World");
    return new Promise<void>((resolve, reject) => {});
  }

  protected menu() {
    const ClickMenuItem = ClickMenuItemFactory(this.emitter.menuItemClick);
    return evalElement(
      <Menu>
        <SubMenu label="Test menu">
          <ClickMenuItem label="Test item 1" id="test-item" />
          <Separator />
          <MenuItem label="Test item 2" />
        </SubMenu>
      </Menu>,
    ) as MenuItemConstructorOptions[];
  }
}

MainApp.main();