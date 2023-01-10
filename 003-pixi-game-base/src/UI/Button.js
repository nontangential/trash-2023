import { BASIC_ASSETS } from "../assetManagement/BasicAssets";

export class Button extends PIXI.utils.EventEmitter {
  static EVENTS = {
    PRESSED: "PRESSED",
  };
  view = new PIXI.Container();
  pressed = false;
  constructor(text = null, color = 0xffffff) {
    super();
    const buttonView = BASIC_ASSETS.SQUARE_100(color);
    this.view.addChild(buttonView);

    if (text) {
      const label = new PIXI.Text(text);
      label.anchor.set(0.5, 0.5);
      label.position.set(50, 50);
      this.view.addChild(label);
    }

    this.view.interactive = true;
    this.view.cursor = "pointer";
    const press = (val) => {
      this.pressed = val;
      buttonView.tint = val ? 0xdadada : 0xffffff;
    };
    this.view.on("pointerdown", () => {
      press(true);
    });
    this.view.on("pointerup", () => {
      press(false);
    });
    this.view.on("pointerupoutside", () => {
      press(false);
    });
  }
}
