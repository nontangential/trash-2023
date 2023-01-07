import { getPlayerPosition, getScreenSize } from "../globals";
import { difference, timer, normalize } from "../utils/utils";
import { Enemy } from "./Enemy";

export class EnemiesManager {
  view = new PIXI.Container();
  list = [];
  spawnTimer = timer(this.spawn, 1000, this);
  constructor() {
    for (let i = 0; i < 10; i++) {
        this.spawn();
    }
  }
  spawn() {
    const enemy = new Enemy();
    const {width, height} = getScreenSize();
    const playerPos = getPlayerPosition();
    enemy.view.position.set(Math.random(), Math.random());


    if (Math.random() > .5) {
      enemy.view.position.x = Math.random() > .5 ? 0 : 1;
    } else {
      enemy.view.position.y = Math.random() > .5 ? 0 : 1;
    }
    enemy.view.position.x *= width;
    enemy.view.position.x -= width/2 - playerPos.x;
    enemy.view.position.y *= height;
    enemy.view.position.y -= height/2 - playerPos.y;

    
    this.list.push(enemy);
    this.view.addChild(enemy.view);
  }
  update(delta) {
    this.spawnTimer.update();

    this.list.forEach(en => {
      const d = difference(en.view.position, getPlayerPosition());

      en.direction.copyFrom(d);

      en.update(delta);
    })
  }
}
