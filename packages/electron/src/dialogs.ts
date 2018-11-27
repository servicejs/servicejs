/**
 * Dialog helpers
 */

/** Imports */

import {
  CertificateTrustDialogOptions,
  MessageBoxOptions,
  OpenDialogOptions,
  remote,
  SaveDialogOptions,
} from "electron";
const { BrowserWindow, dialog } = remote || {
  BrowserWindow: undefined,
  dialog: undefined,
};

//
// Message Box
//

export type MessageBoxCallback = (
  response: number,
  checkboxChecked: boolean,
) => void;

export interface MessageBoxData {
  response: number;
  checkboxChecked: boolean;
}

export const messageBox = (
  opts: MessageBoxOptions,
  handler?: MessageBoxCallback,
) => {
  const browserWindow = BrowserWindow.getAllWindows()[0];
  if (!browserWindow) {
    throw new Error();
  }
  dialog.showMessageBox(browserWindow, opts, handler);
};

export const messageBoxAsync = (opts: MessageBoxOptions) =>
  new Promise<MessageBoxData>((resolve, reject) => {
    try {
      messageBox(opts, (response, checkboxChecked) =>
        resolve({ response, checkboxChecked }),
      );
    } catch (e) {
      reject(e);
    }
  });

//
// ErrorBox
//

export const errorBox = (title: string, content: string) =>
  dialog.showErrorBox(title, content);

//
// CertificateTrustDialog
//

export const certificateTrustDialog = (
  opts: CertificateTrustDialogOptions,
  handler: (...args: any[]) => void,
) => {
  const browserWindow = BrowserWindow.getAllWindows()[0];
  if (!browserWindow) {
    throw new Error();
  }
  dialog.showCertificateTrustDialog(browserWindow, opts, handler);
};

export const certificateTrustDialogAsync = (
  opts: CertificateTrustDialogOptions,
) =>
  new Promise<any[]>((resolve, reject) => {
    try {
      certificateTrustDialog(opts, (...args: any[]) => resolve(args));
    } catch (e) {
      reject(e);
    }
  });

//
// OpenDialog
//

export type OpenDialogCallback = (
  filePaths: string[],
  bookmarks: string[],
) => void;

export interface OpenDialogData {
  filePaths?: string[] | undefined;
  bookmarks?: string[] | undefined;
}

export const openDialog = (
  opts: OpenDialogOptions,
  handler?: OpenDialogCallback,
) => {
  const browserWindow = BrowserWindow.getAllWindows()[0];
  if (!browserWindow) {
    throw new Error();
  }
  dialog.showOpenDialog(browserWindow, opts, handler);
};

export const openDialogAsync = (
  opts: OpenDialogOptions,
): Promise<OpenDialogData> =>
  new Promise<OpenDialogData>((resolve, reject) => {
    try {
      openDialog(opts, (filePaths, bookmarks) =>
        resolve({ filePaths, bookmarks }),
      );
    } catch (e) {
      reject(e);
    }
  });

//
// SaveDialog
//

export type SaveDialogCallback = (filePath: string, bookmark: string) => void;

export interface SaveDialogData {
  filePath?: string | undefined;
  bookmark?: string | undefined;
}

export const saveDialog = (
  opts: SaveDialogOptions,
  handler?: SaveDialogCallback,
) => {
  const browserWindow = BrowserWindow.getAllWindows()[0];
  if (!browserWindow) {
    throw new Error();
  }
  dialog.showSaveDialog(browserWindow, opts, handler);
};

export const saveDialogAsync = (
  opts: SaveDialogOptions,
): Promise<SaveDialogData> =>
  new Promise<SaveDialogData>((resolve, reject) => {
    try {
      saveDialog(opts, (filePath, bookmark) => resolve({ filePath, bookmark }));
    } catch (e) {
      reject(e);
    }
  });
