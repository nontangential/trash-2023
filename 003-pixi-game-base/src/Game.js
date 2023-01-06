import { Background } from "./GameObjects/Background";
import { EnemiesManager } from "./GameObjects/EnemiesManager";
import { Player } from "./GameObjects/Player";
import { initializeGlobals } from "./globals";
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
    const player = new Player();
    const gameStage = new PIXI.Container();
    initializeGlobals({player, app});

    const keyboard = new KeyboardManager();
    const bg = new Background();
    const enemies = new EnemiesManager();
    
    const ui = new UI();

    
    player.connectWSAD(keyboard);
    if (ui.joystick) {
      player.connectJoystick(ui.joystick)
    }
    app.ticker.add(player.update, player);
    app.ticker.add(enemies.update, enemies);






    gameStage.pivot.set(-app.renderer.width / 2, -app.renderer.height / 2);
    // CAMERA
    app.ticker.add(() => {
      gameStage.pivot.set(
        -app.renderer.width / 2 + player.view.x,
        -app.renderer.height / 2 + player.view.y
      );
    });



    this.view.addChild(bg.view);

    gameStage.addChild(enemies.view);
    gameStage.addChild(player.view);

    this.view.addChild(gameStage);
    this.view.addChild(ui.view);
  }
}
