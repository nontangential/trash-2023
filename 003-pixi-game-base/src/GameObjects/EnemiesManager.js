import { Enemy } from "./Enemy";

export class EnemiesManager {
  view = new PIXI.Container();
  constructor(app) {
    for (let i = 0; i < 10; i++) {
        const enemy = new Enemy().view;
        enemy.position.set(Math.random() * 500, Math.random() * 500);
        this.view.addChild(enemy);
    }
  }
}
