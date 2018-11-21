/**
 * Application
 */

/** Imports */

import { Service } from "./service";

export interface ApplicationState {
  state: "new" | "running" | "terminated";
}

export abstract class Application<
  P = {},
  S extends ApplicationState = ApplicationState
> extends Service<P, S> {
  public static async main<
    P = {},
    S extends ApplicationState = ApplicationState
  >(props: P = {} as P) {
    const instance: Application<P, S> = this.new(props);
    return instance.nextAction();
  }

  public static new<
    P = {},
    S extends ApplicationState = ApplicationState
  >(props: P = {} as P) {
    if (this.instance !== undefined) {
      return this.instance;
    }
    const app: Application<P, S> = new (this as any)(props);
    this.instance = app;
    return app;
  }

  protected static instance?: Application<any, any>;

  protected constructor(props: P) {
    super(props);
  }

  protected async nextAction(): Promise<void> {
    switch (this.state.state) {
      case "new":
        this.state.state = "running";
        return this.nextAction();
      case "running":
        return this.main().then(() => {
          this.state.state = "terminated";
          return this.nextAction();
        });
      case "terminated":
        (this.constructor as any).instance = undefined;
        delete (this.constructor as any).instance;
        return;
    }
  }

  protected abstract async main(): Promise<void>;

  protected computeInitialStateFromProps(props: P): S {
    return {
      state: "new",
    } as S;
  }
}
