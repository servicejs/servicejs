/* @jsx h */

import { evalElement as e, h } from "@service/jsx";
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
    // tslint:disable-next-line:no-console
    console.log("Hello World");
    return new Promise<never>((resolve, reject) => {
      /* Purposefully empty */
    });
  }

  protected menu() {
    const ClickMenuItem = ClickMenuItemFactory(this.emitter.menuItemClick);
    return e(
      <Menu>
        <SubMenu label="Test menu">
          <ClickMenuItem label="Test item 1" id="test-item" />
          <Separator />
          <MenuItem label="Test item 2" />
        </SubMenu>
      </Menu>,
    ).props.children as MenuItemConstructorOptions[];
  }
}

MainApp.main();
