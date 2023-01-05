import { Game } from "./Game";


const app = new PIXI.Application({
  resizeTo: window,

  // enable for previous frame blending (set alpha on background tho)
  // clearBeforeRender: false,
  // preserveDrawingBuffer: true
});
document.body.appendChild(app.view);

const game = new Game(app);
app.stage.addChild(game.view);

