
export const getPlayerPosition = () => {
  return globals.game.player.view.position;
};

export const getScreenSize = () => {
  return { width: globals.game.renderer.width, height: globals.game.renderer.height };
};

export const getRenderer = () => {
  return globals.game.renderer;
};


const globals = {
  game: undefined
}

export default globals;