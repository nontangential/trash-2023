import { getTriangleMesh } from "../effects/getTriangleMesh";

export const BASIC_ASSETS = {
    SQUARE_100: (color = 0xffffff) => {
        const shape = new PIXI.Rectangle(0, 0, 100, 100);
        const graphics = new PIXI.Graphics();
        graphics.beginFill(color);
        graphics.drawShape(shape);
        graphics.endFill();
        return graphics;
    },
    CIRCLE_100: (color = 0xffffff) => {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(color);
        graphics.drawCircle(0, 0, 50);
        graphics.endFill();
        return graphics;
    },
    LIGHTNING_BOLT: () => {
        const g = new PIXI.Graphics();
        const width = 512;
        const height = 512;

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
    
          g.moveTo(x, y);
          x += Math.random() * l - l / 2;
          g.lineTo(x, y + l);
          y += l;
          w -= 1;
          l *= 0.8;
        }
        g.closePath();
        return g;
    },
    TRIANGLE_MESH: getTriangleMesh
}