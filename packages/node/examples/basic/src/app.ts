/**
 * Basic example Browser application
 */

import { EnvVar, EnvVarMap, NodeApplication } from "../../../src";

const envVars = EnvVarMap.new({
  language: EnvVar.string("LANG"),
  // xxx: EnvVar.string("XXX"),
  terminal: EnvVar.string("TERMINAL").default("abc"),
});

export class App extends NodeApplication {
  protected async main() {
    try {
      // tslint:disable-next-line:no-console
      console.log(envVars.get());

      // tslint:disable-next-line:no-console
      console.log("Hello World");
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.error(e.message);
    }
  }
}
