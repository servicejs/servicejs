/**
 * Electron renderer process application class module
 */

/** Imports */

import { BrowserApplication } from "@service/browser";
import { ApplicationState } from "@service/core";
import {} from "electron";

export abstract class RendererProcessElectronApplication<
  P = {},
  S extends ApplicationState = ApplicationState,
  Serialized = {}
> extends BrowserApplication<P, S, Serialized> {}
