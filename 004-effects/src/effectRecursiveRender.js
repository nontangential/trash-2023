// const frag1 = `
// uniform vec2 iResolution;
// uniform sampler2D iChannel0;
// void main()
// {
//     vec2 uv = gl_FragCoord.xy / iResolution.xy;
//     gl_FragColor = texture2D(iChannel0,uv);
// }
// `;

// const frag2 = `
// uniform vec2 iResolution;
// uniform sampler2D iChannel0;
// void main()
// {
//     vec2 uv = gl_FragCoord.xy / iResolution.xy;
//     gl_FragColor = texture2D(iChannel0,uv);
// }
// `;


export const effectRecursiveRender = (view, renderer, ticker) => {
    // const f = new PIXI.Filter("", "");
    // view.filters = [f];

    const sss = {
        width: renderer.width,
        height: renderer.height
    };

    let writeBuffer = PIXI.RenderTexture.create(sss);
    let renderBuffer = PIXI.RenderTexture.create(sss);

    const bufferSprite = new PIXI.Sprite(renderBuffer);
    // bufferSprite.scale.set();
    bufferSprite.alpha = 0.999;
    // bufferSprite
    view.addChild(bufferSprite);

    // const buffer = new PIXI.Container();
    console.log(view.width, view.height, view, bufferSprite);

    ticker.add(() => {
        renderer.render(view, {
            renderTexture: writeBuffer,
            clear: true
        });
        [renderBuffer, writeBuffer] = [writeBuffer, renderBuffer];
        bufferSprite.texture = renderBuffer
    });
}