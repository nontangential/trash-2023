import { getPlayerPosition, getScreenSize } from "../globals";
import { difference, timer, normalize } from "../utils";
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
    enemy.view.position.set(Math.random() * width - width/2, Math.random() * height - height/2);


    if (Math.random() > .5) {
      enemy.view.position.x = Math.random() > .5 ? -width/2 : width/2;
    } else {
      enemy.view.position.y = Math.random() > .5 ? -height/2 : height/2;
    }
    
    this.list.push(enemy);
    this.view.addChild(enemy.view);
  }
  update(delta) {
    this.spawnTimer.update();

    this.list.forEach(en => {
      const d = difference(en.view.position, getPlayerPosition());
      const direction = normalize(d);
      en.direction.copyFrom(direction);

      en.update(delta);
    })
  }
}
