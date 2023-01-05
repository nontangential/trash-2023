import { Joystick } from "./Joystick";
import { Button } from "./Button";

export class UI {
  view = new PIXI.Container();
  joystick = null;
  constructor(app) {
    const b1 = new Button("1", 0x49de49);
    b1.view.position.set(25, 0);
    const b2 = new Button("2", 0xde4949);
    b2.view.position.set(150, 0);
    const b3 = new Button("3", 0x4949de);
    b3.view.position.set(275, 0);

    this.joystick = new Joystick(0xfafafa);
    this.joystick.view.position.set(app.renderer.width - 75, 50);

    // app.ticker.add(() => {
    //   console.log(joy.direction)
    // });

    this.view.addChild(b1.view, b2.view, b3.view, this.joystick.view);

    this.view.y = app.renderer.height - 125;
    app.renderer.on("resize", () => {
      this.view.y = app.renderer.height - 125;
      this.joystick.view.x = app.renderer.width - 75;
    });
  }
}
