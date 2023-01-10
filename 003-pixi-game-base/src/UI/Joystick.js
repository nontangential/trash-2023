import { BASIC_ASSETS } from "../assetManagement/BasicAssets";

export class Joystick extends PIXI.utils.EventEmitter {
  static EVENTS = {
    INPUT: "INPUT",
  };
  view = new PIXI.Container();
  pressed = false;
  direction = new PIXI.Point();
  constructor(color = 0xffffff) {
    super();
    
    const graphics = BASIC_ASSETS.CIRCLE_100(color);
    this.view.addChild(graphics);

    this.view.hitArea = new PIXI.Circle(0, 0, 150);
    const hitCircle = new PIXI.Graphics();
    hitCircle.beginFill(color);
    hitCircle.drawCircle(this.view.hitArea.x, this.view.hitArea.y, this.view.hitArea.radius);
    hitCircle.endFill();
    hitCircle.alpha = 0.04;
    this.view.addChild(hitCircle);

    this.view.interactive = true;
    this.view.cursor = "pointer";
    const press = (val) => {
      this.pressed = val;
      graphics.tint = val ? 0xaaaaaa : 0xffffff;
      if (!val) {
        graphics.position.set(0, 0);
      }
      this.direction.copyFrom(graphics.position);
      this.emitUpdate();
    };

    this.view.on("pointerdown", (e) => {
      this.view.toLocal(e.global, null, graphics.position);
      press(true);
      this.direction.copyFrom(graphics.position);
    });
    this.view.on("pointerup", () => {
      press(false);
    });
    this.view.on("pointerupoutside", () => {
      press(false);
    });
    this.view.on("pointerout", () => {
      press(false);
    });
    this.view.on("pointermove", (e) => {
      if (this.pressed) {
        this.view.toLocal(e.global, null, graphics.position);
        // normalize(graphics.position);
        this.direction.copyFrom(graphics.position);
        this.emitUpdate();
      }
    });
  }
  emitUpdate() {
    this.emit(Joystick.EVENTS.INPUT, {direction: this.direction.clone()})
  }
}
