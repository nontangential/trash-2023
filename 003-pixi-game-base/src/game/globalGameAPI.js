const globals = {
  globals: undefined,
};

export const setGlobalGameInstance = function (game) {
  globals.game = game;
};
export const getGameInstance = function () {
  return globals.game;
};

export const getRenderer = () => {
  return globals.game.renderer;
};
export const getTicker = () => {
  return globals.game.ticker;
};

export const getAssetManager = () => {
  return globals.game.assetManager;
};

export const getPlayerPosition = () => {
  return globals.game.player.view.position;
};
export const getScreenSize = () => {
  return {
    width: globals.game.renderer.width,
    height: globals.game.renderer.height,
  };
};


export const getGameAreaCenter = () => {
  return globals.game.gameStage.getCenter();
};
export const getGameArea = () => {
  return globals.game.gameStage.getArea();
};
export const getGameAreaToLoad = () => {
  return globals.game.gameStage.getAreaToLoad();
};