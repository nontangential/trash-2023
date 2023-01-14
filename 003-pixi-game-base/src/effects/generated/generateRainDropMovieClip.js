
const animationFrames = [];
export const generateRainDropMovieClip = function () {
    if (animationFrames.length) {
        // return new PIXI.Sprite(textures[1]);

        return new PIXI.AnimatedSprite(animationFrames);
    }


    const cnv = document.createElement("canvas");        
    const ctx = cnv.getContext("2d");

    const maxFrames = 8;

    const h = 128;//512;
    const w = 32;//256;
    cnv.width = w * maxFrames;
    cnv.height = h;

    ctx.strokeStyle = "#67e8f9";
    ctx.shadowColor = '#cffafe';
    ctx.fillStyle = "#67e8f9";
    ctx.lineWidth = w/32;
    // ctx.shadowBlur = w/16;

    const dropW = w * 0.08;

    const frameConfigs = [
      (x) => {
        ctx.beginPath();
        ctx.fillRect(x + w/2 - dropW/2, h*0.01, dropW, h * 0.11);
        ctx.stroke();
      }, 
      (x) => {
        ctx.beginPath();
        ctx.fillRect(x + w/2 - dropW/2, h*0.12, dropW, h * 0.14);
        ctx.stroke();
      },
      (x) => {
        ctx.beginPath();
        ctx.fillRect(x + w/2 - dropW/2, h*0.25, dropW, h * 0.16);
        ctx.stroke();
      },
      (x) => {
        ctx.beginPath();
        ctx.fillRect(x + w/2 - dropW/2, h*0.38, dropW, h * 0.24);
        ctx.stroke();
      },
      (x) => {
        ctx.beginPath();
        ctx.fillRect(x + w/2 - dropW/2, h*0.56, dropW, h * 0.24);
        ctx.stroke();
      },
      (x) => {
        ctx.beginPath();
        ctx.fillRect(x + w/2 - dropW/2, h*0.74 , dropW, h * 0.20);
        ctx.ellipse(x + w/2, h - w * 0.15, w * 0.225, w * 0.05, 0, Math.PI*2, 0, false);
        ctx.stroke();
      },
      (x) => {
        ctx.beginPath();
        ctx.fillRect(x + w/2 - dropW/2, h*0.92 , dropW, h * 0.05);
        ctx.ellipse(x + w/2, h - w * 0.15, w * 0.39, w * 0.1, 0, Math.PI*2, 0, false);
        ctx.stroke();
      },
      (x) => {
        ctx.beginPath();
        ctx.ellipse(x + w/2, h - w * 0.15, w * 0.2, w * 0.04, 0, Math.PI*2, 0, false);
        ctx.stroke();
      },
    ];

    for (let frame = 0; frame < maxFrames; frame++) { 
      
        const x = frame * w;

        frameConfigs[frame](x)

        // console.log(x, frame)
    };


    const spritesheet = new PIXI.BaseTexture(cnv);
    
    for (let frame = 0; frame < maxFrames; frame++) {
      const x = frame * w;
      const frameBounds = new PIXI.Rectangle(x, 0, w, h);
      animationFrames.push(new PIXI.Texture(spritesheet, frameBounds));
    }
    

    // document.body.appendChild(cnv)

    // console.log(cnv)
    
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
  