import { GameObject } from "./GameObject";

export class Enemy extends GameObject {
  constructor() {
    super();
    this.view.tint = 0xef4444;
  }
}
