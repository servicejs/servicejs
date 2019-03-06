/**
 * Electron main process application class module
 */

/** Imports */

import { ApplicationState } from "@service/core";
import { NodeApplication } from "@service/node";
import { app, BrowserWindow, BrowserWindowConstructorOptions } from "electron";
import { existsSync } from "fs";
import * as path from "path";
import { format as formatUrl } from "url";
import {
  ElectronEventArgMap,
  ListenerMap,
  listenToElectronEvents,
} from "./electron-events";
import { MaybeMap } from "./util";

export interface MainProcessElectronApplicationProps {
  development?: boolean;
  name?: string;
  mainWindow?: BrowserWindowConstructorOptions;
}

export interface MainProcessElectronApplicationState extends ApplicationState {
  mainWindow: BrowserWindow | null;
}

export class MainProcessElectronApplication<
  P extends MainProcessElectronApplicationProps = MainProcessElectronApplicationProps,
  S extends MainProcessElectronApplicationState = MainProcessElectronApplicationState
> extends NodeApplication<P, S> {
  public static defaultProps: MainProcessElectronApplicationProps = {
    development: process.env.NODE_ENV !== "production",
    mainWindow: {},
  };

  protected onElectronEvent: MaybeMap<ListenerMap<ElectronEventArgMap>> = {
    activate: () => {
      // on macOS it is common to re-create a window even after all windows have been closed
      this.mainWindow();
    },
    ready: () => {
      this.createMainWindow();
      this.displayMenu();
    },
    // quit application when all windows are closed
    "window-all-closed": () => {
      // on macOS it is common for applications to stay open until the user explicitly quits
      if (process.platform !== "darwin") {
        app.quit();
      }
    },
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

    // Register Electron event listeners
    listenToElectronEvents(this.onElectronEvent);
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
      // Depending on the build target, the index.html file can be in different locations,
      // but always (?) in the current or in a parent directory of this file
      let currentDir = __dirname;
      let currentFile = path.normalize(path.join(currentDir, "index.html"));
      let found = false;
      while (!found) {
        if (existsSync(currentFile)) {
          found = true;
          break;
        }
        const oldDir = currentDir;
        currentDir = path.normalize(path.join(currentDir, ".."));
        currentFile = path.normalize(path.join(currentDir, "index.html"));
        if (oldDir === currentDir) {
          break;
        }
      }
      if (!found) {
        process.exit(1);
      }

      window.loadURL(
        formatUrl({
          pathname: currentFile,
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

  protected displayMenu(): void {
    // Menu.setApplicationMenu(Menu.buildFromTemplate([]));
  }

  protected async main() {}
}
