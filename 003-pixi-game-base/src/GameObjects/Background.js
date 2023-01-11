import { BASIC_ASSETS } from "../assetManagement/BasicAssets";
import { getRenderer, getScreenSize } from "../game/globalGameAPI";

export class Background {
  view = new PIXI.Container();
  constructor() {
    const bg = this.view = BASIC_ASSETS.SQUARE_100(0x27272a);
    bg.alpha = 0.99;

    const screenSize = getScreenSize();
    bg.width = screenSize.width;
    bg.height = screenSize.height;
    getRenderer().on("resize", () => {
      const screenSize = getScreenSize();
      bg.width = screenSize.width;
      bg.height = screenSize.height;
    });
  }
}
