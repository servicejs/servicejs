/**
 * BrowserApplication class
 */

import {
  Application,
  ApplicationState,
  Serializable,
  Unserializable,
} from "@service/core";
import { persistObjectToStorage, restoreObjectFromStorage } from "./storage";

export abstract class BrowserApplication<
  P = {},
  S extends ApplicationState = ApplicationState,
  Serialized = {}
> extends Application<P, S>
  implements Serializable<Serialized>, Unserializable<Serialized> {
  protected on: {
    beforeUnload?: (event: Event) => string | null | void;
  } = {
    beforeUnload: (ev: BeforeUnloadEvent) => {
      this.terminate();
    },
  };

  public serialize(): Serialized {
    return {} as Serialized;
  }

  public unserialize(value: Serialized) {
    return;
  }

  protected init() {
    if (this.on.beforeUnload) {
      window.addEventListener("beforeunload", this.on.beforeUnload);
    }
    this.restoreFromStorage();
  }

  protected async nextAction() {
    if (this.state.state === "new") {
      this.init();
    }

    return super.nextAction();
  }

  protected terminate() {
    this.persistToStorage();
    this.state.state = "terminated";
    return this.nextAction();
  }

  protected persistToStorage(key: string = "app") {
    return persistObjectToStorage(key, this.serialize());
  }

  protected restoreFromStorage(key: string = "app") {
    const storedValue: Serialized | null | undefined = restoreObjectFromStorage(
      key,
    );
    if (typeof storedValue !== "undefined" && storedValue !== null) {
      this.unserialize(storedValue);
    }
  }
}
