
import * as PIXI from "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/7.1.0/pixi.min.mjs";
import { fluidPoints } from "./fluidPoints";
import { lightning } from "./lightning";
window.PIXI = PIXI;

// import { createNoise2D } from "https://cdn.skypack.dev/simplex-noise@4.0.0";


const app = new PIXI.Application({
  resizeTo: window,
  // enable for previous frame blending (set alpha on background tho)
  // clearBeforeRender: false,
  // preserveDrawingBuffer: true
});
document.body.appendChild(app.view);

window.__stage = app.stage;

PIXI.Assets.add('a', 'a.png');
await PIXI.Assets.load(['a']);

// lightning(app.stage, app.ticker, app.renderer);
fluidPoints(app.stage, app.ticker, app.renderer);


// if (import.meta.env.DEV) {
//   await import(
//     "https://cdn.jsdelivr.net/npm/tweakpane@3.1.1/dist/tweakpane.min.js"
//   );

//   const pane = new Tweakpane.Pane();

//   pane.addMonitor(app.ticker, "FPS", {
//     view: "graph",
//     min: -0,
//     max: +300,
//   });
//   pane.addMonitor(app.ticker, "deltaTime", {
//     view: "graph",
//     min: -0,
//     max: +10,
//   });
// }