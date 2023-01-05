import { EnemiesManager } from "./GameObjects/EnemiesManager";
import { Player } from "./GameObjects/Player";
import { KeyboardManager } from "./KeyboardManager";
import { UI } from "./UI/UI";

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

export class Game {
  view = new PIXI.Container();
  constructor(app) {
    const keyboard = new KeyboardManager();
    const ui = new UI(app);
    
    const player = new Player(app);
    player.connectWSAD(keyboard);
    if (ui.joystick) {
      player.connectJoystick(ui.joystick)
    }
    app.ticker.add(player.update, player);

    const enemies = new EnemiesManager(app);

    const bg = new PIXI.Graphics();
    bg.beginFill(0x27272A);
    bg.drawRect(0, 0, 50, 50);
    bg.endFill();
    bg.alpha = 0.99;
    this.view.addChild(bg);

    bg.width = app.renderer.width;
    bg.height = app.renderer.height;
    app.renderer.on("resize", () => {
      bg.width = app.renderer.width;
      bg.height = app.renderer.height;
    });

    const gameStage = new PIXI.Container();
    gameStage.pivot.set(-app.renderer.width / 2, -app.renderer.height / 2);
    // CAMERA
    app.ticker.add(() => {
      gameStage.pivot.set(
        -app.renderer.width / 2 + player.view.x,
        -app.renderer.height / 2 + player.view.y
      );
    });
    gameStage.addChild(enemies.view);
    gameStage.addChild(player.view);

    // this.view.addChild(enemies.view);
    this.view.addChild(gameStage);
    this.view.addChild(ui.view);
  }
}
