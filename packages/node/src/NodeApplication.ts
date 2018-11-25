/**
 * NodeApplication
 */

/** Imports */

import { Application, ApplicationState } from "@service/core";
import { nodeJSProcessEvents, ProcessEventMap } from "./events";

/** Declarations */

export abstract class NodeApplication<
  P = {},
  S extends ApplicationState = ApplicationState
> extends Application<P, S> {
  protected readonly onRuntimeEvent: Partial<ProcessEventMap> = {
    beforeExit: (code?: number) => {
      this.terminate(code);
    },
    // rejectionHandled: (promise: Promise<any>) => {},
    uncaughtException: (error: Error) => {
      // tslint:disable-next-line:no-console
      console.error(error);
      this.terminate(1);
    },
    unhandledRejection: (reason: any, promise: Promise<any>) => {
      // tslint:disable-next-line:no-console
      console.error(reason, promise);
      this.terminate(1);
    },

    SIGINT: (signal) => {
      // tslint:disable-next-line:no-console
      console.log(`${signal} received. Terminating.`);
      this.terminate();
    },
    SIGTERM: (signal) => {
      // tslint:disable-next-line:no-console
      console.log(`${signal} received. Terminating.`);
      this.terminate();
    },
  };

  protected init() {
    // Initialize all NodeJS event handlers to conditionally use the handlers
    // in `onRuntimeEvent`, if they are set
    for (const event of nodeJSProcessEvents) {
      process.on(event as any, (...args: any[]) => {
        const handler: any = this.onRuntimeEvent[event];
        if (handler) {
          return handler(...args);
        }
      });
    }
  }

  protected async terminate(code?: number) {
    this.state.state = "terminated";
    this.nextAction();
    process.exit(code);
  }
}
