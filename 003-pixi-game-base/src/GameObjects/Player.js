import { KeyboardManager } from "../browserTools/KeyboardManager";
import { Joystick } from "../UI/Joystick";
import { GameObject } from "./GameObject";

export class Player extends GameObject {
  maxVelocity = 5;
  constructor() {
    super();
    this.view.tint = 0x84cc16;
  }
  connectWSAD(keyboard) {    
    // go in direction of last pressed keys
    keyboard.on(KeyboardManager.EVENTS.KEYDOWN, ({ key }) => {
      if (key === "w") {
        this.direction.y = -1;
      } else if (key === "s") {
        this.direction.y = 1;
      } else if (key === "a") {
        this.direction.x = -1;
      } else if (key === "d") {
        this.direction.x = 1;
      }
    });
    // after unpressing, check opposite key to improve movement fluidity
    keyboard.on(KeyboardManager.EVENTS.KEYUP, ({ key }) => {
      if (key === "w") {
        this.direction.y = keyboard.keys.s ? 1 : 0;
      } else if (key === "s") {
        this.direction.y = keyboard.keys.w ? -1 : 0;
      } else if (key === "a") {
        this.direction.x = keyboard.keys.d ? 1 : 0;
      } else if (key === "d") {
        this.direction.x = keyboard.keys.a ? -1 : 0;
      }
    });
  }
  connectJoystick(joystick) {
    joystick.on(Joystick.EVENTS.INPUT, ({direction}) => {
      this.direction.copyFrom(direction);
      console.log(direction)
    })
  }
}
