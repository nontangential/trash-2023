import { magnitude } from "../utils";

export class GameObject {
  view = new PIXI.Container();
  velocity = new PIXI.Point(0, 0);
  direction = new PIXI.Point(0, 0);
  maxVelocity = 5;
  // acceleration = new PIXI.Point(0, 0);
  constructor() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRect(0, 0, 50, 50);
    graphics.endFill();
    this.view = graphics;
  }
  update(delta) {
    // this.velocity.x += this.acceleration.x * delta;
    // this.velocity.y += this.acceleration.y * delta;
    // const velocity = magnitude(this.velocity);
    // if (velocity > this.maxVelocity) {
    //   this.velocity.x *= this.maxVelocity / velocity;
    //   this.velocity.y *= this.maxVelocity / velocity;
    // }

    // this.view.x += this.velocity.x * delta;
    // this.view.y += this.velocity.y * delta;


    const dirNormal = magnitude(this.direction);
    this.velocity.x = (this.direction.x / dirNormal * this.maxVelocity) || 0;
    this.velocity.y = (this.direction.y / dirNormal * this.maxVelocity) || 0;

    this.view.x += this.velocity.x * delta;
    this.view.y += this.velocity.y * delta;
  }
}
