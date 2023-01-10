import { BASIC_ASSETS } from "../assetManagement/BasicAssets";
import { magnitude } from "../utils/utils";

export class GameObject {
  view = new PIXI.Container();
  velocity = new PIXI.Point(0, 0);
  direction = new PIXI.Point(0, 0);
  maxVelocity = 1;
  // acceleration = new PIXI.Point(0, 0);
  constructor(view = BASIC_ASSETS.SQUARE_100) {
    this.view = view();
    this.view.pivot.set(25, 25);
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

    // TODO: consider Phil Nowell method
    // console.log(
      // x * Math.sqrt(1 - (y * y) / 2),
      // y * Math.sqrt(1 - (x * x) / 2)
    // );

    const dirMagnitude = magnitude(this.direction);
    this.velocity.x = (this.direction.x / dirMagnitude) * this.maxVelocity || 0;
    this.velocity.y = (this.direction.y / dirMagnitude) * this.maxVelocity || 0;

    this.view.x += this.velocity.x * delta;
    this.view.y += this.velocity.y * delta;
  }
}
