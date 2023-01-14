export const lightning = function(stage, ticker, renderer) {

    const w = 256;
    const h = 512;

    const source = [w/2, 0];
    const target = [w/2, h];


    const input = PIXI.RenderTexture.create({width: w, height: h});

    let deltaMs = 0;
    let frame = 0;





    const draw = (delta) => {

    }










    const effect = PIXI.Sprite.from("a")
    stage.addChild(effect);
    ticker.add(draw)
}