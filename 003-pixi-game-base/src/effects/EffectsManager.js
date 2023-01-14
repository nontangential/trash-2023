import { KNOWN_ASSETS } from "../assetManagement/knownAssets";
import { getAssetManager, getGameArea } from "../game/globalGameAPI";
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
    // const {width, height} = getScreenSize();
    // console.log(getScreenSize(), getGameArea())
    const area = getGameArea();
    effect.x = area.x + Math.random() * area.width
    effect.y = area.y + Math.random() * area.height
    effect.scale.set(0.5);
    this.view.addChild(effect);
  }


  mockupRain() {

    const area = getGameArea();
    // const area = getGameAreaToLoad();
    const maxParticles = area.width * area.height * 0.00025;

    
    const factory = getAssetManager().assetMap.get(KNOWN_ASSETS.RAIN_DROP_MOVIECLIP);

    // const maxParticles = 50000; // 50k - 240fsp, 100k -120fps
    const rain = new PIXI.ParticleContainer(maxParticles, {position: false, uvs: true});

    // const maxParticles = 8000; // 8k - 240fsp, 15k -120fps
    // const rain = new PIXI.Container();

    for(let i = 0; i < maxParticles; i++) {
      const drop = factory();

      // drop.anchor.set(0.5);
      // drop.scale.set(0.75 + Math.random() * 0.5);

      // drop.x = Math.random() * width - width/2;
      // drop.y = Math.random() * height - height/2;

      drop.x = area.x + Math.random() * area.width;
      drop.y = area.y + Math.random() * area.height;

      // drop.scale.set(0.66);

      drop.animationSpeed = 0.2;
      drop.gotoAndPlay(Math.random() * drop.textures.length | 0);

      rain.addChild(drop);
      
    }

    this.view.addChild(rain)
  }
  
  update(delta) {
    this.mockupLightingTimer.update(delta);
    // this.spawnTimer.update(delta);

  }
}
