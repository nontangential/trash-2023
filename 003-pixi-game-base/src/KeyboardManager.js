export class KeyboardManager extends PIXI.utils.EventEmitter {
  static EVENTS = {
    KEYDOWN: "KEYDOWN",
    KEYDOWN: "KEYUP",
  };
  keys = { w: 0, s: 0, a: 0, d: 0, 1: 0, 0: 0 };
  constructor() {
    super();
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }
  onKeyDown = ({ key }) => {
    if (key in this.keys) {
      this.keys[key] = 1;
      this.emit(KeyboardManager.EVENTS.KEYDOWN, { key });
    }
  };
  onKeyUp = ({ key }) => {
    if (key in this.keys) {
      this.keys[key] = 0;
      this.emit(KeyboardManager.EVENTS.KEYUP, { key });
    }
  };
}
