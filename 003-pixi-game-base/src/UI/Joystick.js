export class Joystick extends PIXI.utils.EventEmitter {
  static EVENTS = {
    INPUT: "INPUT",
  };
  view = new PIXI.Container();
  pressed = false;
  direction = new PIXI.Point();
  constructor(color = 0xffffff) {
    super();
    const graphics = new PIXI.Graphics();
    graphics.beginFill(color);
    graphics.drawCircle(0, 0, 50);
    graphics.endFill();
    this.view.addChild(graphics);

    this.view.hitArea = new PIXI.Circle(0, 0, 75);
    this.view.interactive = true;
    this.view.cursor = "pointer";
    const press = (val) => {
      this.pressed = val;
      graphics.tint = val ? 0xaaaaaa : 0xffffff;
      if (!val) graphics.position.set(0, 0);
      this.direction = graphics.position.clone();
      this.emitUpdate()
    };

    this.view.on("pointerdown", (e) => {
      press(true);
      this.view.toLocal(e.global, null, graphics.position);
    });
    this.view.on("pointerup", () => {
      press(false);
    });
    this.view.on("pointerupoutside", () => {
      press(false);
    });
    this.view.on("pointermove", (e) => {
      if (this.pressed) {
        this.view.toLocal(e.global, null, graphics.position);
        this.direction.copyFrom(graphics.position.clone());
        this.emitUpdate();
      }
    });
  }
  emitUpdate() {
    this.emit(Joystick.EVENTS.INPUT, {direction: this.direction.clone()})
  }
}
