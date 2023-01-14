import { AssetManager } from "../assetManagement/AssetManager";
import { KNOWN_ASSETS } from "../assetManagement/knownAssets";
import { KeyboardManager } from "../browserTools/KeyboardManager";
import { Background } from "../GameObjects/Background";
import { EnemiesManager } from "../enemies/EnemiesManager";
import { Player } from "../GameObjects/player/Player";
import { CollisionManager } from "../collision/CollisionManager";
import { EffectsManager } from "../effects/EffectsManager";
import { ProjectileManager } from "../projectiles/ProjectileManager";
import { setGlobalGameInstance } from "./globalGameAPI";
import { UI } from "../UI/UI";
import { CenteredGameStage } from "../gameObjects/CenteredGameStage";
import { effectRecursiveRender } from "../../../004-effects/effectRecursiveRender"

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
  static ASSETS = {
    BUTTON: "BUTTON",
    JOYSTICK: "JOYSTICK",
    PLAYER: "PLAYER",
    ENEMY: "ENEMY",
    LIGHTNING_BOLT: "LIGHTNING_BOLT",
  };

  view = new PIXI.Container();

  renderer;
  ticker;

  assetMap;
  assetManager;
  


  background;
  player;
  ui;
  gameStage;

  keyboardManager;
  effectsManager;
  collisionManager;
  projectileManager;
  enemiesManager;

  constructor(app, assetMap, assetList) {
    this.renderer = app.renderer;
    this.ticker = app.ticker;
    this.assetMap = assetMap;
    this.assetList = assetList;
  }

  async initialize() {
    setGlobalGameInstance(this);
    
    this.assetManager = new AssetManager();
    this.assetManager.mapAssets(this.assetMap);
    const assetListLoaded = this.assetManager.loadAssets(this.assetList);
    const assetsGenrated = this.assetManager.generateAssets();


    this.keyboardManager = new KeyboardManager();
    this.effectsManager = new EffectsManager();
    this.collisionManager = new CollisionManager();
    this.projectileManager = new ProjectileManager();
    this.enemiesManager = new EnemiesManager();

    await assetListLoaded;
    await assetsGenrated;
    await this.initializeViews();
  }

  async initializeViews() {  
    this.background = new Background();
    this.player = new Player(this.assetManager.assetMap.get(KNOWN_ASSETS.PLAYER));
    this.ui = new UI();
    this.gameStage = new CenteredGameStage();


    this.view.addChild(this.background.view);
    this.view.addChild(this.gameStage.view);
      this.gameStage.view.addChild(this.enemiesManager.view);
      this.gameStage.view.addChild(this.player.view);
      this.gameStage.view.addChild(this.projectileManager.view);
      this.gameStage.view.addChild(this.effectsManager.view);
    this.view.addChild(this.ui.view);
  }

  start() {
    this.gameStage.limitTo(() => ({width: this.renderer.width, height: this.renderer.height}) );
    this.gameStage.centerAround(() => this.player.view.position);

    this.enemiesManager.initialize();
    this.effectsManager.initialize();
    this.keyboardManager.enable();

    this.player.connectKeyboard(this.keyboardManager);
    if (this.ui.joystick) {
      this.player.connectJoystick(this.ui.joystick)
    }


    // CAMERAS
    // const centerCamera = () => {
    //   this.gameStage.pivot.set(
    //     -this.renderer.width / 2 + this.player.view.x,
    //     -this.renderer.height / 2 + this.player.view.y
    //   );
    // }
    // this.ticker.add(centerCamera);

    // START TICKERS
    this.ticker.add(this.player.update, this.player);
    this.ticker.add(this.gameStage.update, this.gameStage);
    this.ticker.add(this.enemiesManager.update, this.enemiesManager);
    this.ticker.add(this.effectsManager.update, this.effectsManager);
    this.ticker.add(this.collisionManager.update, this.collisionManager);
    this.ticker.add(this.projectileManager.update, this.projectileManager);


    
    effectRecursiveRender(this.view, this.renderer, this.ticker);
  }
}
