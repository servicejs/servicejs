/**
 * Electron main process application class module
 */

/** Imports */

import { ApplicationState } from "@service/core";
import { NodeApplication } from "@service/node";
import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Menu,
  MenuItemConstructorOptions,
} from "electron";
import * as path from "path";
import { format as formatUrl } from "url";

export interface MainProcessElectronApplicationProps {
  development?: boolean;
  name?: string;
  mainWindow?: BrowserWindowConstructorOptions;
}

export interface MainProcessElectronApplicationState extends ApplicationState {
  mainWindow: BrowserWindow | null;
}

export abstract class MainProcessElectronApplication<
  P extends MainProcessElectronApplicationProps = MainProcessElectronApplicationProps,
  S extends MainProcessElectronApplicationState = MainProcessElectronApplicationState
> extends NodeApplication<P, S> {
  public static defaultProps: MainProcessElectronApplicationProps = {
    development: process.env.NODE_ENV !== "production",
    mainWindow: {},
  };
  constructor(props: P) {
    super({
      ...MainProcessElectronApplication.defaultProps,
      ...(props as any),
    });
  }

  protected init() {
    super.init();

    // Set application name
    if (this.props.name) {
      app.setName(this.props.name);
    }

    // quit application when all windows are closed
    app.on("window-all-closed", () => {
      // on macOS it is common for applications to stay open until the user explicitly quits
      if (process.platform !== "darwin") {
        app.quit();
      }
    });

    app.on("activate", () => {
      // on macOS it is common to re-create a window even after all windows have been closed
      this.mainWindow();
    });

    app.on("ready", () => {
      this.createMainWindow();
      const menu = Menu.buildFromTemplate(this.menu());
      Menu.setApplicationMenu(menu);
    });
  }

  protected hasMainWindow() {
    return this.state.mainWindow !== null;
  }

  protected mainWindow() {
    this.createMainWindow();
    return this.state.mainWindow!;
  }

  /**
   * Creates the main window
   */
  protected createMainWindow() {
    if (this.hasMainWindow()) {
      return;
    }

    const window = new BrowserWindow(this.props.mainWindow || {});

    if (this.props.development) {
      window.webContents.openDevTools();
      window.loadURL(
        `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`,
      );
    } else {
      window.loadURL(
        formatUrl({
          pathname: path.join(__dirname, "index.html"),
          protocol: "file",
          slashes: true,
        }),
      );
    }

    window.on("closed", () => {
      this.state.mainWindow = null;
    });

    window.webContents.on("devtools-opened", () => {
      window.focus();
      setImmediate(() => {
        window.focus();
      });
    });

    this.state.mainWindow = window;

    return window;
  }

  protected computeInitialStateFromProps(props: P) {
    return {
      mainWindow: null,
      state: "new",
    } as S;
  }

  protected abstract menu(): MenuItemConstructorOptions[];
}
