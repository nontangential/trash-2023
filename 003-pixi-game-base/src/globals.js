
let player = null;
let app = null;

export const initializeGlobals = function(o) {
    player = o.player;
    app = o.app;
}

export const getPlayerPosition = () => player.view.position

export const getScreenSize = () => {
  return {width: app.renderer.width, height: app.renderer.height};
}

export const getRenderer = () => {
  return app.renderer;
}