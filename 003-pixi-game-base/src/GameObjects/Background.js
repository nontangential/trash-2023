import { getRenderer, getScreenSize } from "../globals";

export class Background {
  view = new PIXI.Container();
  constructor() {
    const bg = this.view = new PIXI.Graphics();
    bg.beginFill(0x27272a);
    bg.drawRect(0, 0, 50, 50);
    bg.endFill();
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
