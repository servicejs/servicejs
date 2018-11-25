/**
 * Basic example Browser application
 */

import { BrowserApplication } from "../../../lib";

export class App extends BrowserApplication {
  protected async main() {
    // tslint:disable-next-line:no-console
    console.log("Hello World");
  }
}
