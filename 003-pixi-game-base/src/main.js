// import 'https://cdn.jsdelivr.net/npm/modern-css-reset@1.4.0/dist/reset.min.css';
// import 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/7.0.5/pixi.min.js';
// import "pixi.js";


import { BASIC_ASSETS } from "./assetManagement/BasicAssets";
import { KNOWN_ASSETS } from "./assetManagement/knownAssets";
import { Game } from "./Game";

const app = new PIXI.Application({
  resizeTo: window,

  // enable for previous frame blending (set alpha on background tho)
  // clearBeforeRender: false,
  // preserveDrawingBuffer: true
});
document.body.appendChild(app.view);


const assetList = [
  {name: "bunny", url: "assets/bunny.png"},
  {name: "txtr", url: "assets/txtr.png"}
];



const assetMap = {
  [KNOWN_ASSETS.BUTTON]: BASIC_ASSETS.SQUARE_100,
  [KNOWN_ASSETS.JOYSTICK]: BASIC_ASSETS.CIRCLE_100,
  [KNOWN_ASSETS.PLAYER]: BASIC_ASSETS.SQUARE_100,
  // [KNOWN_ASSETS.PLAYER]: () => new PIXI.Sprite(PIXI.utils.TextureCache["bunny"]),
  [KNOWN_ASSETS.ENEMY]: BASIC_ASSETS.SQUARE_100,
  [KNOWN_ASSETS.LIGHTNING_BOLT]: BASIC_ASSETS.LIGHTNING_BOLT,
  [KNOWN_ASSETS.RAIN_DROP_MOVIECLIP]: BASIC_ASSETS.RAIN_DROP_MOVIECLIP

};

window.__stage = app.stage;

const game = new Game(app, assetMap, assetList);
game.initialize().then(() => {
  app.stage.addChild(game.view);
  game.start();
});