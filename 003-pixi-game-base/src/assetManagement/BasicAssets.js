import { generateRainDropMovieClip } from "../effects/generated/generateRainDropMovieClip";
import { genetateLightningSprite } from "../effects/generated/generateLightningSprite";
import { getTriangleMesh } from "../effects/generated/getTriangleMesh";
import {
  generateMultipassLightning,
  generateSimpleLightning,
} from "../effects/generated/generateLightningGraphics";

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
  LIGHTNING_BOLT: genetateLightningSprite,
  LIGHTNING_BOLT_SIMPLE: generateSimpleLightning,
  LIGHTNING_BOLT_MULTIPASS: generateMultipassLightning,
  TRIANGLE_MESH: getTriangleMesh,
  RAIN_DROP_MOVIECLIP: generateRainDropMovieClip,
};
