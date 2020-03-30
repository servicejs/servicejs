import {
  MenuItemIpcProtocol,
  RendererProcessElectronApplication,
} from "../../../../src";

class Renderer extends RendererProcessElectronApplication {
  protected async main() {
    console.log("Hello World");

    MenuItemIpcProtocol.Renderer.listen({
      menuItemClick: (id) => console.log("click", id),
    });
  }
}

Renderer.main();
