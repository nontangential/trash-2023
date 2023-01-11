import { KNOWN_ASSETS } from "../assetManagement/knownAssets";
import { getAssetManager, getScreenSize } from "../game/globalGameAPI";
import { timer } from "../utils/utils";

export class EffectsManager {
  view = new PIXI.Container();
  spawnTimer;
  mockupLightingTimer;

  initialize() {
    this.mockupLightingTimer = timer(this.mockupLighting, 1000, this);
    // this.spawnTimer = timer(this.mockupRain, 300, this);
    this.mockupRain();
  }
  mockupLighting() {
    const effect = getAssetManager().assetMap.get(KNOWN_ASSETS.LIGHTNING_BOLT)();
    const {width, height} = getScreenSize();
    // const effect = new PIXI.Sprite(genetateLightningTexture());
    effect.x = Math.random() * width - width/2;
    effect.y = -height/2;
    effect.scale.set(0.5);
    this.view.addChild(effect);
  }


  mockupRain() {
    const maxParticles = 500;
    // const maxParticles = 8000; // 50k - 240fsp, 100k -120fps
    // const rain = new PIXI.ParticleContainer(maxParticles, {position: false, uvs: true});


    // const maxParticles = 8000; // 8k - 240fsp, 15k -120fps
    // const rain = new PIXI.Container();
    this.view.addChild(rain)
    const factory = getAssetManager().assetMap.get(KNOWN_ASSETS.RAIN_DROP_MOVIECLIP);
    


    const {width, height} = getScreenSize();

    for(let i = 0; i < maxParticles; i++) {
      const drop = factory();

      drop.anchor.set(0.5);
      drop.scale.set(0.75 + Math.random() * 0.5);
      drop.gotoAndPlay(Math.random() * 5 | 0);

      drop.x = Math.random() * width - width/2;
      drop.y = Math.random() * height - height/2;
      drop.scale.set(0.5);

      drop.animationSpeed = 0.2;

      rain.addChild(drop);
      
    }

  }
  
  update(delta) {
    this.mockupLightingTimer.update(delta);
    // this.spawnTimer.update(delta);

  }
}
