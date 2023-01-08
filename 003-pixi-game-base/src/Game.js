import { AssetManager } from "./assetTools/AssetManager";
import { KeyboardManager } from "./browserTools/KeyboardManager";
import { Background } from "./GameObjects/Background";
import { EnemiesManager } from "./GameObjects/enemies/EnemiesManager";
import { Player } from "./GameObjects/player/Player";
import { CollisionManager } from "./gameTools/CollisionManager";
import { EffectsManager } from "./gameTools/EffectsManager";
import { ProjectileManager } from "./gameTools/ProjectileManager";
import globals from "./globals";
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

  renderer;
  ticker;
  
  assetManager;
  
  keyboardManager;

  ui;
  player;
  enemiesManager;

  effectsManager;
  collisionManager;
  projectileManager;

  constructor(app) {
    this.initialize();
    this.renderer = app.renderer;
    this.ticker = app.ticker;
  }

  async initialize() {
    globals.game = this;

    // SYSTEMS
    const assetManager = this.assetManager = new AssetManager();
    const keyboardManager = this.keyboardManager = new KeyboardManager();

    // WAIT FOR ASSETS();
    await assetManager.load();

    // JUST VIEWS
    const bg = new Background();
    const gameStage = new PIXI.Container();

    // KEY VIEWS
    const ui = this.ui = new UI();
    const player = this.player = new Player();
    const enemiesManager = this.enemiesManager = new EnemiesManager();

    // IN-GAME SYSTEMS
    const effectsManager = this.effectsManager = new EffectsManager();
    const collisionManager = this.collisionManager = new CollisionManager();
    const projectileManager = this.projectileManager = new ProjectileManager();


        
    player.connectWSAD(keyboardManager);
    if (ui.joystick) {
      player.connectJoystick(ui.joystick)
    }



    // CAMERA
    const centerCamera = () => {
      gameStage.pivot.set(
        -this.renderer.width / 2 + player.view.x,
        -this.renderer.height / 2 + player.view.y
      );
    }
    this.ticker.add(centerCamera);


    // VIEW TREE SETUP
    this.view.addChild(bg.view);

    gameStage.addChild(enemiesManager.view);
    gameStage.addChild(player.view);
    // gameStage.addChild(projectileManager.view);
    gameStage.addChild(effectsManager.view);

    this.view.addChild(gameStage);
    this.view.addChild(ui.view);


    // START TICKERS
    this.ticker.add(player.update, player);
    this.ticker.add(enemiesManager.update, enemiesManager);
    this.ticker.add(effectsManager.update, effectsManager);
    this.ticker.add(collisionManager.update, collisionManager);
    this.ticker.add(projectileManager.update, projectileManager);
  }
}
