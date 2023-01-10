import { KNOWN_ASSETS } from "../assetManagement/knownAssets";
import { getAssetManager, getScreenSize } from "../globalGameAPI";
import { timer } from "../utils/utils";

export class EffectsManager {
  view = new PIXI.Container();
  spawnTimer;
  mockupLightingTimer;

  initialize() {
    // this.mockupLightingTimer = timer(this.mockupLighting, 1000, this);
    this.spawnTimer = timer(this.mockupRain, 300, this);
  }
  mockupLighting() {
    const effect = getAssetManager().assetMap.get(KNOWN_ASSETS.LIGHTNING_BOLT)();
    const {width, height} = getScreenSize();
    // const effect = new PIXI.Sprite(genetateLightningTexture());
    effect.x = Math.random() * width - width/2;
    effect.y = -height/2;
    this.view.addChild(effect);
  }

  mockupRain() {
    const effect = getAssetManager().assetMap.get(KNOWN_ASSETS.RAIN_DROP_MOVIECLIP)();
    const {width, height} = getScreenSize();
    effect.x = Math.random() * width - width/2;
    effect.y = Math.random() * height - height/2;
    // effect.play();
    console.log(effect)
    effect.scale.set(0.5)
    effect.animationSpeed = 0.2;
    effect.play()

    this.view.addChild(effect);
  }
  
  update(delta) {
    // this.mockupLightingTimer.update(delta);
    this.spawnTimer.update(delta);

  }
}
