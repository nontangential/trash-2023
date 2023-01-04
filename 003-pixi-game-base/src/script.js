const app = new PIXI.Application({
  resizeTo: window
});
document.body.appendChild(app.view);

class KeyboardManager extends PIXI.utils.EventEmitter {
  static EVENTS = {
    KEYDOWN: "KEYDOWN",
    KEYDOWN: "KEYUP",
  }
  keys = { "w": 0, "s": 0, "a": 0, "d": 0, "1": 0, "0": 0 }
  constructor() {
    super();
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }
  onKeyDown = ({key}) => {
    if (key in this.keys) {
      this.keys[key] = 1;
      this.emit(KeyboardManager.EVENTS.KEYDOWN, {key})
    }
  }
  onKeyUp = ({key}) => {
    if (key in this.keys) {
      this.keys[key] = 0;
      this.emit(KeyboardManager.EVENTS.KEYUP, {key})
    }
  }
}
const keys = new KeyboardManager();

class Button extends PIXI.utils.EventEmitter {
  static EVENTS = {
    PRESSED: "PRESSED",
  }
  view = new PIXI.Container();
  pressed = false;
  constructor(text = null, color = 0xFFFFFF) {
    super();
    const graphics = new PIXI.Graphics();
    graphics.beginFill(color);
    graphics.drawRect(0, 0, 100, 100);
    graphics.endFill();
    this.view.addChild(graphics)
    
    if (text) {
      const label = new PIXI.Text(text);
      label.anchor.set(0.5, 0.5)
      label.position.set(50, 50)
      this.view.addChild(label);
    }
    
    graphics.interactive = true;
    graphics.cursor = 'pointer';
    const press = val => {
      this.pressed = val;
      graphics.tint = val ? 0xDADADA : 0xFFFFFF;
    }
    graphics.on("pointerdown", () => {
      press(true);
    });
    graphics.on("pointerup", () => {
      press(false)
    });
    graphics.on("pointerupoutside", () => {
      press(false)
    });
  }
}

class Joystick {
  view = new PIXI.Container();
  pressed = false;
  direction = new PIXI.Point();
  constructor(color = 0xFFFFFF) {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(color);
    graphics.drawCircle(0, 0, 50);
    graphics.endFill();
    this.view.addChild(graphics)
    
    this.view.hitArea = new PIXI.Circle(0,0, 75);
    this.view.interactive = true;
    this.view.cursor = 'pointer';
    const press = val => {
      this.pressed = val;
      graphics.tint = val ? 0xAAAAAA : 0xFFFFFF;
      if (!val) graphics.position.set(0, 0);
      this.direction = graphics.position.clone();
    }
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
        this.direction = graphics.position.clone();
      }
    });
  }
}

class UI {
  view = new PIXI.Container();
  constructor() {
    const b1 = new Button("1", 0x49DE49);
    b1.view.position.set(25, 0);
    const b2 = new Button("2", 0xDE4949);
    b2.view.position.set(150, 0);
    const b3 = new Button("3", 0x4949DE);
    b3.view.position.set(275, 0);
    
    const joy = new Joystick(0xFAFAFA);
    joy.view.position.set(app.renderer.width - 75, 50);
    
    // app.ticker.add(() => {
    //   console.log(joy.direction)
    // });

    
    this.view.addChild(b1.view, b2.view, b3.view, joy.view);
    
    this.view.y = app.renderer.height - 125;
    app.renderer.on("resize", () => {
      this.view.y = app.renderer.height - 125;
      joy.view.x = app.renderer.width - 75;
    })
  }
}
const ui = new UI();

class Player {
  view = new PIXI.Container();
  velocity = new PIXI.Point(0, 0);
  maxVelocity = new PIXI.Point(3, 3);
  acceleration = new PIXI.Point(0, 0);
  constructor() {
    const graphics = new PIXI.Graphics();

    graphics.beginFill(0xDEDE49);
    graphics.drawRect(0, 0, 50, 50);
    graphics.endFill();
    
    this.view.addChild(graphics);
    
    app.ticker.add(() => {
      this.velocity.x = this.acceleration.x;
      // this.velocity.x = Math.min(this.maxVelocity.x, this.velocity.x);
      this.velocity.y = this.acceleration.y;
      // this.velocity.y = Math.min(this.maxVelocity.y, this.velocity.y);

      
      this.view.x += this.velocity.x;
      this.view.y += this.velocity.y;
    })
  }
}
const player = new Player();
keys.on(KeyboardManager.EVENTS.KEYDOWN, ({key}) => {
  if (key === "w") {player.acceleration.y = -1};
  if (key === "s") {player.acceleration.y = 1}
  if (key === "a") {player.acceleration.x = -1}
  if (key === "d") {player.acceleration.x = 1}
})
keys.on(KeyboardManager.EVENTS.KEYUP, ({key}) => {
  if (key === "w") {player.acceleration.y = keys.keys.s ? 1: 0};
  if (key === "s") {player.acceleration.y = keys.keys.w ? -1: 0};
  if (key === "a") {player.acceleration.x = keys.keys.d ? 1: 0};
  if (key === "d") {player.acceleration.x = keys.keys.a ? -1: 0};
});

// const viewTree = [
//   /*game*/[
//     "bg",
//     "terrain",
//     "npc",
//     "player",
//     "effects",
//     "ui"
//   ],
//   "menu",
//   "splash",
//   "loader"
// ];

class Game {
  view = new PIXI.Container();
  constructor() {
    this.view.addChild(player.view);
    this.view.addChild(ui.view);
  }
}
const game = new Game();

app.stage.addChild(game.view);

