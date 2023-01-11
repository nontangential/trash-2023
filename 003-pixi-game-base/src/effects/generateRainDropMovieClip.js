
const animationFrames = [];
export const generateRainDropMovieClip = function () {
    if (animationFrames.length) {
        // return new PIXI.Sprite(textures[1]);

        return new PIXI.AnimatedSprite(animationFrames);
    }


    const cnv = document.createElement("canvas");        
    const ctx = cnv.getContext("2d");

    const maxFrames = 5;

    const h = 128;//512;
    const w = 32;//256;
    cnv.width = w * maxFrames;
    cnv.height = h;

    for (let frame = 0; frame < maxFrames; frame++) { 
        
        ctx.strokeStyle = "#67e8f9";
        ctx.shadowColor = '#cffafe';
        ctx.fillStyle = "#67e8f9";
        ctx.lineWidth = w/32;
        ctx.shadowBlur = w/16;

        const dropW = w * 0.1;

      
        const x = frame * w;

        if (frame === 0) {
          ctx.beginPath();
          ctx.fillRect(x + w/2 - dropW/2, h*0.05, dropW, h * 0.13);
          ctx.stroke();
        } else if (frame === 1) {
          ctx.beginPath();
          ctx.fillRect(x + w/2 - dropW/2, h*0.25, dropW, h * 0.22);
          ctx.stroke();
        } else if (frame === 2) {
          ctx.beginPath();
          ctx.fillRect(x + w/2 - dropW/2, h*0.50, dropW, h * 0.25);
          ctx.stroke();
        } else if (frame === 3) {
          ctx.beginPath();
          ctx.fillRect(x + w/2 - dropW/2, h*0.75, dropW, h * 0.18);
          ctx.ellipse(x + w/2, h - w * 15/100, w * 0.225, w * 0.05, 0, Math.PI*2, 0, false);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.ellipse(x + w/2, h - w * 15/100, w * 0.45, w * 0.1, 0, Math.PI*2, 0, false);
          ctx.stroke();
        }

        console.log(x, frame)
    };


    const spritesheet = new PIXI.BaseTexture(cnv);
    
    for (let frame = 0; frame < maxFrames; frame++) {
      const x = frame * w;
      const frameBounds = new PIXI.Rectangle(x, 0, w, h);
      animationFrames.push(new PIXI.Texture(spritesheet, frameBounds));
    }
    

    document.body.appendChild(cnv)

    console.log(cnv)
    
    // var app = new PIXI.Application(800, 600, {autoStart: false} );
    // document.body.appendChild(app.view);
    
    // const rts = textures.map(t => {

    //   const rt = PIXI.RenderTexture.create(app.screen.width, app.screen.height);
    //   app.renderer.render(new PIXI.Sprite(t), rt);
    //   return rt;
    // })

    // window.raindrops = animationFrames;
    // console.log(window.raindrops)
  
    return new PIXI.AnimatedSprite(animationFrames);
    // return new PIXI.Sprite(textures[1]);

};
  