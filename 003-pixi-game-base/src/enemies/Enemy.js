import { GameObject } from "../gameObjects/GameObject";

export class Enemy extends GameObject {
  maxVelocity = 3;
  constructor(view) {
    super(view);
    this.view.tint = 0xef4444;
  }
}
