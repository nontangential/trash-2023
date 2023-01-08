export class Button extends PIXI.utils.EventEmitter {
  static EVENTS = {
    PRESSED: "PRESSED",
  };
  view = new PIXI.Container();
  pressed = false;
  constructor(text = null, color = 0xffffff, shape = new PIXI.Rectangle(0, 0, 100, 100)) {
    super();
    const graphics = new PIXI.Graphics();
    graphics.beginFill(color);
    graphics.drawShape(shape);
    graphics.endFill();
    this.view.addChild(graphics);

    if (text) {
      const label = new PIXI.Text(text);
      label.anchor.set(0.5, 0.5);
      label.position.set(50, 50);
      this.view.addChild(label);
    }

    graphics.interactive = true;
    graphics.cursor = "pointer";
    const press = (val) => {
      this.pressed = val;
      graphics.tint = val ? 0xdadada : 0xffffff;
    };
    graphics.on("pointerdown", () => {
      press(true);
    });
    graphics.on("pointerup", () => {
      press(false);
    });
    graphics.on("pointerupoutside", () => {
      press(false);
    });
  }
}
