import { KNOWN_ASSETS } from "../../assetManagement/knownAssets";
import { getAssetManager, getPlayerPosition, getScreenSize } from "../../globalGameAPI";
import { difference, timer } from "../../utils/utils";
import { Enemy } from "./Enemy";

export class EnemiesManager {
  view = new PIXI.Container();
  list = [];
  spawnTimer;

  initialize() {
    this.spawnTimer = timer(this.spawn, 1000, this);
    for (let i = 0; i < 10; i++) {
      this.spawn();
    }
  }
  spawn() {
    const enemy = new Enemy(getAssetManager().assetMap.get(KNOWN_ASSETS.ENEMY));
    const { width, height } = getScreenSize();

    //TODO: use camera position instead
    const playerPos = getPlayerPosition();
    enemy.view.position.set(Math.random(), Math.random());

    if (Math.random() > 0.5) {
      enemy.view.position.x = Math.random() > 0.5 ? 0 : 1;
    } else {
      enemy.view.position.y = Math.random() > 0.5 ? 0 : 1;
    }
    enemy.view.position.x *= width;
    enemy.view.position.x -= width / 2 - playerPos.x;
    enemy.view.position.y *= height;
    enemy.view.position.y -= height / 2 - playerPos.y;

    this.list.push(enemy);
    this.view.addChild(enemy.view);
  }
  update(delta) {
    this.spawnTimer.update();

    this.list.forEach((en) => {
      const d = difference(en.view.position, getPlayerPosition());

      en.direction.copyFrom(d);

      en.update(delta);
    });
  }
}
