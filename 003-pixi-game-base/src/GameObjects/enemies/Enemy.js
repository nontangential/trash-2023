import { GameObject } from "../GameObject";

export class Enemy extends GameObject {
  maxVelocity = 3;
  constructor() {
    super();
    this.view.tint = 0xef4444;
  }
}
