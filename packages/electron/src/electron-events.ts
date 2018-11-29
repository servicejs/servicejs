/**
 * Electron app events
 */

// tslint:disable:ban-types

/** Imports */

import {
  app,
  AuthInfo,
  BrowserWindow,
  Certificate,
  Session,
  WebContents,
} from "electron";
import { PartialMaybeMap } from "./util";

export enum ElectronEvent {
  AccessibilitySupportChanged = "accessibility-support-changed",
  Activate = "activate",
  ActivityWasContinued = "activity-was-continued",
  BeforeQuit = "before-quit",
  BrowserWindowBlur = "browser-window-blur",
  BrowserWindowCreated = "browser-window-created",
  BrowserWindowFocus = "browser-window-focus",
  CertificateError = "certificate-error",
  ContinueActivity = "continue-activity",
  GPUProcessCrashed = "gpu-process-crashed",
  Login = "login",
  NewWindowForTab = "new-window-for-tab",
  OpenFile = "open-file",
  OpenUrl = "open-url",
  Quit = "quit",
  Ready = "ready",
  SecondInstance = "second-instance",
  SelectClientCertificate = "select-client-certificate",
  SessionCreated = "session-created",
  UpdateActivityState = "update-activity-state",
  WebContentsCreated = "web-contents-created",
  WillContinueActivity = "will-continue-activity",
  WillFinishLaunching = "will-finish-launching",
  WillQuit = "will-quit",
  WindowAllClosed = "window-all-closed",
}

const Keys = <T extends object>(obj: T): Array<keyof T> =>
  Object.keys(obj as any) as any;
const Values = <T extends object>(obj: T): Array<T[keyof T]> =>
  Object.keys(obj as any) as any;

export const electronEventKeys = Object.freeze(Keys(ElectronEvent));
export const electronEventValues = Object.freeze(Values(ElectronEvent));

//  * NSApplication.You would usually set u

export interface ElectronEventArgMap {
  /**
   * Emitted when Chrome's accessibility support changes. This event fires when
   * assistive technologies, such as screen readers, are enabled or disabled. See
   * https://www.chromium.org/developers/design-documents/accessibility for more
   * details.
   *
   *  accessibilitySupportEnabled is `true` when Chrome's accessibility support is enabled, `false` otherwise.
   */
  [ElectronEvent.AccessibilitySupportChanged]: {
    event: Event;
    accessibilitySupportEnabled: boolean;
  };
  /**
   * Emitted when the application is activated. Various actions can trigger this
   * event, such as launching the application for the first time, attempting to
   * re-launch the application when it's already running, or clicking on the
   * application's dock or taskbar icon.
   */
  [ElectronEvent.Activate]: {
    event: Event;
    hasVisibleWindows: boolean;
  };
  /**
   * Emitted during Handoff after an activity from this device was successfully
   * resumed on another one.
   *
   * type - A string identifying the activity.
   * userInfo - Contains app-specific state stored by the activity
   */
  [ElectronEvent.ActivityWasContinued]: {
    event: Event;
    type: string;
    userInfo: any;
  };
  /**
   * Emitted before the application starts closing its windows. Calling
   * event.preventDefault() will prevent the default behaviour, which is terminating
   * the application. Note: If application quit was initiated by
   * autoUpdater.quitAndInstall() then before-quit is emitted after emitting close
   * event on all windows and closing them. Note: On Windows, this event will not be
   * emitted if the app is closed due to a shutdown/restart of the system or a user
   * logout.
   */
  [ElectronEvent.BeforeQuit]: {
    event: Event;
  };
  /**
   * Emitted when a browserWindow gets blurred.
   */
  [ElectronEvent.BrowserWindowBlur]: {
    event: Event;
    window: BrowserWindow;
  };
  /**
   * Emitted when a new browserWindow is created.
   */
  [ElectronEvent.BrowserWindowCreated]: {
    event: Event;
    window: BrowserWindow;
  };
  /**
   * Emitted when a browserWindow gets focused.
   */
  [ElectronEvent.BrowserWindowFocus]: {
    event: Event;
    window: BrowserWindow;
  };
  /**
   * Emitted when failed to verify the certificate for url, to trust the certificate
   * you should prevent the default behavior with event.preventDefault() and call
   * callback(true).
   *
   * `error` - The error code
   */
  [ElectronEvent.CertificateError]: {
    event: Event;
    webContents: WebContents;
    url: string;
    error: string;
    certificate: Certificate;
    callback: (isTrusted: boolean) => void;
  };
  /**
   * Emitted during Handoff when an activity from a different device wants to be
   * resumed. You should call event.preventDefault() if you want to handle this
   * event. A user activity can be continued only in an app that has the same
   * developer Team ID as the activity's source app and that supports the activity's
   * type. Supported activity types are specified in the app's Info.plist under the
   * NSUserActivityTypes key.
   *
   * `type` - A string identifying the activity
   * `userInfo` - Contains app-specific state stored by the activity on another device.
   */
  [ElectronEvent.ContinueActivity]: {
    event: Event;
    type: string;
    userInfo: any;
  };
  /**
   * Emitted when the gpu process crashes or is killed.
   */
  [ElectronEvent.GPUProcessCrashed]: { event: Event; killed: boolean };
  /**
   * Emitted when webContents wants to do basic auth. The default behavior is to
   * cancel all authentications, to override this you should prevent the default
   * behavior with event.preventDefault() and call callback(username, password) with
   * the credentials.
   */
  [ElectronEvent.Login]: {
    event: Event;
    webContents: WebContents;
    request: Request;
    authInfo: AuthInfo;
    callback: (username: string, password: string) => void;
  };
  /**
   * Emitted when the user clicks the native macOS new tab button. The new tab button
   * is only visible if the current BrowserWindow has a tabbingIdentifier
   */
  [ElectronEvent.NewWindowForTab]: { event: Event };
  /**
   * Emitted when the user wants to open a file with the application. The open-file
   * event is usually emitted when the application is already open and the OS wants
   * to reuse the application to open the file. open-file is also emitted when a file
   * is dropped onto the dock and the application is not yet running. Make sure to
   * listen for the open-file event very early in your application startup to handle
   * this case (even before the ready event is emitted). You should call
   * event.preventDefault() if you want to handle this event. On Windows, you have to
   * parse process.argv (in the main process) to get the filepath.
   */
  [ElectronEvent.OpenFile]: { event: Event; path: string };
  /**
   * Emitted when the user wants to open a URL with the application. Your
   * application's Info.plist file must define the url scheme within the
   * CFBundleURLTypes key, and set NSPrincipalClass to AtomApplication. You should
   * call event.preventDefault() if you want to handle this event.
   */
  [ElectronEvent.OpenUrl]: { event: Event; url: string };
  /**
   * Emitted when the application is quitting. Note: On Windows, this event will not
   * be emitted if the app is closed due to a shutdown/restart of the system or a
   * user logout.
   */
  [ElectronEvent.Quit]: { event: Event; exitCode: number };
  /**
   * Emitted when Electron has finished initializing. On macOS, launchInfo holds the
   * userInfo of the NSUserNotification that was used to open the application, if it
   * was launched from Notification Center. You can call app.isReady() to check if
   * this event has already fired.
   */
  [ElectronEvent.Ready]: { event: Event; launchInfo: any };
  /**
   * This event will be emitted inside the primary instance of your application when
   * a second instance has been executed. argv is an Array of the second instance's
   * command line arguments, and workingDirectory is its current working directory.
   * Usually applications respond to this by making their primary window focused and
   * non-minimized. This event is guaranteed to be emitted after the ready event of
   * app gets emitted.
   *
   * `argv` - An array of the second instance's command line arguments
   * `workingDirectory` - The second instance's working directory
   */
  [ElectronEvent.SecondInstance]: {
    event: Event;
    argv: string[];
    workingDirectory: string;
  };
  /**
   * Emitted when a client certificate is requested. The url corresponds to the
   * navigation entry requesting the client certificate and callback can be called
   * with an entry filtered from the list. Using event.preventDefault() prevents the
   * application from using the first certificate from the store.
   */
  [ElectronEvent.SelectClientCertificate]: {
    event: Event;
    webContents: WebContents;
    url: string;
    certificateList: Certificate[];
    callback: (certificate?: Certificate) => void;
  };
  /**
   * Emitted when Electron has created a new session.
   */
  [ElectronEvent.SessionCreated]: { event: Event; session: Session };
  /**
   * Emitted when Handoff is about to be resumed on another device. If you need to
   * update the state to be transferred, you should call event.preventDefault()
   * immediately, construct a new userInfo dictionary and call
   * app.updateCurrentActiviy() in a timely manner. Otherwise the operation will fail
   * and continue-activity-error will be called.
   *
   * `type` - A string identifying the activity
   * `userData` - Contains app-specific state stored by the activity
   */
  [ElectronEvent.UpdateActivityState]: {
    event: Event;
    type: string;
    userInfo: any;
  };
  /**
   * Emitted when a new webContents is created.
   */
  [ElectronEvent.WebContentsCreated]: {
    event: Event;
    webContents: WebContents;
  };
  /**
   * Emitted during Handoff before an activity from a different device wants to be
   * resumed. You should call event.preventDefault() if you want to handle this
   * event.
   *
   * `type` - A string identifying the activity
   */
  [ElectronEvent.WillContinueActivity]: { event: Event; type: string };
  /**
   * Emitted when the application has finished basic startup. On Windows and Linux,
   * the will-finish-launching event is the same as the ready event; on macOS, this
   * event represents the applicationWillFinishLaunching notification of
   * listeners for the open-file and open-url
   * events here, and start the crash reporter and auto updater. In most cases, you
   * should do everything in the ready event handler.
   */
  [ElectronEvent.WillFinishLaunching]: {
    event: Event;
    listener: Function;
  };
  /**
   * Emitted when all windows have been closed and the application will quit. Calling
   * event.preventDefault() will prevent the default behaviour, which is terminating
   * the application. See the description of the window-all-closed event for the
   * differences between the will-quit and window-all-closed events. Note: On
   * Windows, this event will not be emitted if the app is closed due to a
   * shutdown/restart of the system or a user logout.
   */
  [ElectronEvent.WillQuit]: { event: Event };
  /**
   * Emitted when all windows have been closed. If you do not subscribe to this event
   * and all windows are closed, the default behavior is to quit the app; however, if
   * you subscribe, you control whether the app quits or not. If the user pressed Cmd
   * + Q, or the developer called app.quit(), Electron will first try to close all
   * the windows and then emit the will-quit event, and in this case the
   * window-all-closed event would not be emitted.
   */
  [ElectronEvent.WindowAllClosed]: { event: Event; listener: Function };
}

export type ListenerMap<EventArgMap> = {
  [K in keyof EventArgMap]: (args: EventArgMap[K]) => void
};

export const listenToElectronEvents = (
  listenerMap: PartialMaybeMap<ListenerMap<ElectronEventArgMap>>,
) => {
  app.on(
    ElectronEvent.AccessibilitySupportChanged,
    (event: Event, accessibilitySupportEnabled: boolean) => {
      const handler = listenerMap[ElectronEvent.AccessibilitySupportChanged];
      if (handler) {
        handler({
          accessibilitySupportEnabled,
          event,
        });
      }
    },
  );
  app.on(ElectronEvent.Activate, (event: Event, hasVisibleWindows: boolean) => {
    const handler = listenerMap[ElectronEvent.Activate];
    if (handler) {
      handler({
        event,
        hasVisibleWindows,
      });
    }
  });
  app.on(
    ElectronEvent.ActivityWasContinued,
    (event: Event, type: string, userInfo: any) => {
      const handler = listenerMap[ElectronEvent.ActivityWasContinued];
      if (handler) {
        handler({
          event,
          type,
          userInfo,
        });
      }
    },
  );
  app.on(ElectronEvent.BeforeQuit, (event: Event) => {
    const handler = listenerMap[ElectronEvent.BeforeQuit];
    if (handler) {
      handler({ event });
    }
  });
  app.on(
    ElectronEvent.BrowserWindowBlur,
    (event: Event, window: BrowserWindow) => {
      const handler = listenerMap[ElectronEvent.BrowserWindowBlur];
      if (handler) {
        handler({ event, window });
      }
    },
  );
  app.on(
    ElectronEvent.BrowserWindowCreated,
    (event: Event, window: BrowserWindow) => {
      const handler = listenerMap[ElectronEvent.BrowserWindowCreated];
      if (handler) {
        handler({ event, window });
      }
    },
  );
  app.on(
    ElectronEvent.BrowserWindowFocus,
    (event: Event, window: BrowserWindow) => {
      const handler = listenerMap[ElectronEvent.BrowserWindowFocus];
      if (handler) {
        handler({ event, window });
      }
    },
  );
  app.on(
    ElectronEvent.CertificateError,
    (
      event: Event,
      webContents: WebContents,
      url: string,
      error: string,
      certificate: Certificate,
      callback: (isTrusted: boolean) => void,
    ) => {
      const handler = listenerMap[ElectronEvent.CertificateError];
      if (handler) {
        handler({
          callback,
          certificate,
          error,
          event,
          url,
          webContents,
        });
      }
    },
  );
  app.on(
    ElectronEvent.ContinueActivity,
    (event: Event, type: string, userInfo: any) => {
      const handler = listenerMap[ElectronEvent.ContinueActivity];
      if (handler) {
        handler({ event, type, userInfo });
      }
    },
  );
  app.on(ElectronEvent.GPUProcessCrashed, (event: Event, killed: boolean) => {
    const handler = listenerMap[ElectronEvent.GPUProcessCrashed];
    if (handler) {
      handler({ event, killed });
    }
  });
  app.on(
    ElectronEvent.Login as any,
    (
      event: Event,
      webContents: WebContents,
      request: Request,
      authInfo: AuthInfo,
      callback: (username: string, password: string) => void,
    ) => {
      const handler = listenerMap[ElectronEvent.Login];
      if (handler) {
        handler({ authInfo, callback, event, request, webContents });
      }
    },
  );
  app.on(ElectronEvent.NewWindowForTab, (event: Event) => {
    const handler = listenerMap[ElectronEvent.NewWindowForTab];
    if (handler) {
      handler({ event });
    }
  });
  app.on(ElectronEvent.OpenFile, (event: Event, path: string) => {
    const handler = listenerMap[ElectronEvent.OpenFile];
    if (handler) {
      handler({ event, path });
    }
  });
  app.on(ElectronEvent.OpenUrl, (event: Event, url: string) => {
    const handler = listenerMap[ElectronEvent.OpenUrl];
    if (handler) {
      handler({ event, url });
    }
  });
  app.on(ElectronEvent.Quit, (event: Event, exitCode: number) => {
    const handler = listenerMap[ElectronEvent.Quit];
    if (handler) {
      handler({ event, exitCode });
    }
  });
  app.on(ElectronEvent.Ready as any, (event: Event, launchInfo: any) => {
    const handler = listenerMap[ElectronEvent.Ready];
    if (handler) {
      handler({ event, launchInfo });
    }
  });
  app.on(
    ElectronEvent.SecondInstance,
    (event: Event, argv: string[], workingDirectory: string) => {
      const handler = listenerMap[ElectronEvent.SecondInstance];
      if (handler) {
        handler({ event, argv, workingDirectory });
      }
    },
  );
  app.on(
    ElectronEvent.SelectClientCertificate,
    (
      event: Event,
      webContents: WebContents,
      url: string,
      certificateList: Certificate[],
      callback: (certificate?: Certificate) => void,
    ) => {
      const handler = listenerMap[ElectronEvent.SelectClientCertificate];
      if (handler) {
        handler({ event, webContents, url, certificateList, callback });
      }
    },
  );
  app.on(
    ElectronEvent.SessionCreated as any,
    (event: Event, session: Session) => {
      const handler = listenerMap[ElectronEvent.SessionCreated];
      if (handler) {
        handler({ event, session });
      }
    },
  );
  app.on(
    ElectronEvent.UpdateActivityState,
    (event: Event, type: string, userInfo: any) => {
      const handler = listenerMap[ElectronEvent.UpdateActivityState];
      if (handler) {
        handler({ event, type, userInfo });
      }
    },
  );
  app.on(
    ElectronEvent.WebContentsCreated,
    (event: Event, webContents: WebContents) => {
      const handler = listenerMap[ElectronEvent.WebContentsCreated];
      if (handler) {
        handler({ event, webContents });
      }
    },
  );
  app.on(ElectronEvent.WillContinueActivity, (event: Event, type: string) => {
    const handler = listenerMap[ElectronEvent.WillContinueActivity];
    if (handler) {
      handler({ event, type });
    }
  });
  app.on(
    ElectronEvent.WillFinishLaunching,
    (event: Event, listener: Function) => {
      const handler = listenerMap[ElectronEvent.WillFinishLaunching];
      if (handler) {
        handler({ event, listener });
      }
    },
  );
  app.on(ElectronEvent.WillQuit, (event: Event) => {
    const handler = listenerMap[ElectronEvent.WillQuit];
    if (handler) {
      handler({ event });
    }
  });
  app.on(ElectronEvent.WindowAllClosed, (event: Event, listener: Function) => {
    const handler = listenerMap[ElectronEvent.WindowAllClosed];
    if (handler) {
      handler({ event, listener });
    }
  });
};
