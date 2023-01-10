export class KeyboardManager extends PIXI.utils.EventEmitter {
  static EVENTS = {
    KEYDOWN: "KEYDOWN",
    KEYDOWN: "KEYUP",
  };
  keys = { w: false, s: false, a: false, d: false, 1: false, 0: false };
  enabled = false;
  constructor() {
    super();
  }
  enable() {
    if (!this.enabled) {
      this.enabled = true;
      window.addEventListener("keydown", this.onKeyDown);
      window.addEventListener("keyup", this.onKeyUp);
    }
  }
  disable() {
    if (this.enabled) {
      this.enabled = false;
      window.removeEventListener("keydown", this.onKeyDown);
      window.removeEventListener("keyup", this.onKeyUp);
    }
  }
  onKeyDown = ({ key }) => {
    if (key in this.keys) {
      this.keys[key] = true;
      this.emit(KeyboardManager.EVENTS.KEYDOWN, { key });
    }
  };
  onKeyUp = ({ key }) => {
    if (key in this.keys) {
      this.keys[key] = false;
      this.emit(KeyboardManager.EVENTS.KEYUP, { key });
    }
  };
}
