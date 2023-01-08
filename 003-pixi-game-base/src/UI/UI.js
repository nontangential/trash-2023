import { Joystick } from "./Joystick";
import { Button } from "./Button";
import { getRenderer, getScreenSize } from "../globals";
import { isMobile } from "../utils/utils";


export class UI {
  view = new PIXI.Container();
  joystick = null;
  constructor() {
    const buttonPanel = new PIXI.Container();
    this.view.addChild(buttonPanel);

    const b1 = new Button("1", 0x49de49);
    const b2 = new Button("2", 0xde4949);
    const b3 = new Button("3", 0x4949de);
    
    const mobileScaleMultiplier = isMobile() ? 1.5 : 1;
    const adjustButtonsToScreen = () => {
      const screenSize = getScreenSize();
      const buttonSize = (screenSize.height + screenSize.width) * 0.02 * mobileScaleMultiplier;
      const buttonMargin = buttonSize * 0.2;
      [b1, b2, b3].forEach((btn, i) => {
        btn.view.scale.set(buttonSize/100); // TODO: unhardcode btn size
        btn.view.position.set(buttonSize * i + buttonMargin * (i+1), 0);
      });
      buttonPanel.y = screenSize.height - buttonSize - buttonMargin;
    }
    adjustButtonsToScreen()

    buttonPanel.addChild(b1.view, b2.view, b3.view);




    this.joystick = new Joystick(0xfafafa);
    this.view.addChild(this.joystick.view);
    const adjustJoystickToScreen = () => {
      const screenSize = getScreenSize();
      const joystickSize = (screenSize.height + screenSize.width) * 0.08 * mobileScaleMultiplier;
      this.joystick.view.scale.set(joystickSize/300); 
      this.joystick.view.position.set(screenSize.width - joystickSize*0.5, screenSize.height - joystickSize*0.5); 
    }
    adjustJoystickToScreen();

    getRenderer().on("resize", () => {
      adjustButtonsToScreen();
      adjustJoystickToScreen();
    });
  }
}
