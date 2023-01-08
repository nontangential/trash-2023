import { getScreenSize } from "../globals";

export class EffectsManager {
  view = new PIXI.Container();

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.mockupLighting();
    }
  }

  mockupLighting() {
    const g = new PIXI.Graphics();
    const { width, height } = getScreenSize();

    // const texture = PIXI.utils.TextureCache["assets/txtr.png"];

    for (
      let i = 0,
        x = Math.random() * width - width / 2,
        y = -height / 2,
        w = 10,
        l = 100;
      i < 10;
      i++
    ) {
      g.lineStyle(w, 0x7DD3FC, 1/i);
    //   g.lineStyle({
    //     width: w,
    //     color: 0x7dd3fc,
    //     alpha: 1 / i,
    //     cap: PIXI.LINE_CAP.SQUARE,
    //     join: PIXI.LINE_JOIN.MITER,
    //   });

      //   g.lineTextureStyle(w, PIXI.utils.TextureCache['assets/txtr.png'], 1/i)
      //   g.lineTextureStyle({ width: w, texture: texture, alpha: 1 / i });

      g.moveTo(x, y);
      x += Math.random() * l - l / 2;
      g.lineTo(x, y + l);
      y += l;
      w -= 1;
      l *= 0.8;
    }
    g.closePath();

    this.view.addChild(g);
  }

  //   mockupLighting() {
  //     const texture = PIXI.utils.TextureCache["assets/bunny.png"];

  //     var line = new PIXI.Graphics()
  //       .moveTo(0, 10)
  //       .lineTextureStyle({
  //         width: 10,
  //         texture: texture,
  //         alpha: 0.5,
  //       })
  //       .lineTo(200, 400);

  //     this.view.addChild(line);
  //   }

  update(delta) {
    // this.mockupLighting();
  }
}
