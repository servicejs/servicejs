/**
 * BrowserApplication class
 */

import { Application, ApplicationState } from "@service/core";

export abstract class BrowserApplication<
  P = {},
  S extends ApplicationState = ApplicationState
> extends Application<P, S> {
  protected storageKey: string = "app";

  protected on: {
    beforeUnload?: (event: Event) => string | null | void;
  } = {
    beforeUnload: (ev: BeforeUnloadEvent) => {
      this.terminate();
    },
  };

  protected init() {
    if (this.on.beforeUnload) {
      window.addEventListener("beforeunload", this.on.beforeUnload);
    }
  }

  protected async nextAction() {
    if (this.state.state === "new") {
      this.init();
    }

    return super.nextAction();
  }

  protected saveStateToStorage() {
    try {
      sessionStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.state));
      } catch (e) {
        return false;
        // Intentionally blank
      }
    }
    return true;
  }

  protected loadStateFromStorage() {
    let storedItem: string | null = null;
    try {
      storedItem = sessionStorage.getItem(this.storageKey);
    } catch (e) {
      try {
        storedItem = localStorage.getItem(this.storageKey);
      } catch (e) {
        // Intentionally blank
      }
    }

    if (storedItem) {
      try {
        return JSON.parse(storedItem) as S;
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.error(e);
      }
    }
  }

  protected terminate() {
    this.saveStateToStorage();
    this.state.state = "terminated";
    return this.nextAction();
  }

  protected computeInitialStateFromProps(props: P) {
    const state = this.loadStateFromStorage();
    if (state) {
      return state;
    }
    return super.computeInitialStateFromProps(props);
  }
}
