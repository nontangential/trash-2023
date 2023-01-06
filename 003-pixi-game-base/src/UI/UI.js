import { Joystick } from "./Joystick";
import { Button } from "./Button";
import { isMobile } from "../utils";
import { getRenderer, getScreenSize } from "../globals";


export class UI {
  view = new PIXI.Container();
  joystick = null;
  constructor() {
    // if (isMobile()) {
    //   this.initMobileUI();
    // } else {
      this.initWebUI();
    
  }
  initMobileUI() {

  }

  initWebUI() {
    const b1 = new Button("1", 0x49de49);
    b1.view.position.set(25, 0);
    const b2 = new Button("2", 0xde4949);
    b2.view.position.set(150, 0);
    const b3 = new Button("3", 0x4949de);
    b3.view.position.set(275, 0);

    this.joystick = new Joystick(0xfafafa);
    const screenSize = getScreenSize();
    this.joystick.view.position.set(screenSize.width - 125, 0);

    // app.ticker.add(() => {
    //   console.log(joy.direction)
    // });

    this.view.addChild(b1.view, b2.view, b3.view, this.joystick.view);

    this.view.y = screenSize.height - 125;
    getRenderer().on("resize", () => {
      const screenSize = getScreenSize();
      this.view.y = screenSize.height - 125;
      this.joystick.view.x = screenSize.width - 75;
    });
  }
}
