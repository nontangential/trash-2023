
const textures = [];
export const generateRainDropMovieClip = function () {
    if (textures.length) {
        // return new PIXI.Sprite(textures[1]);

        return new PIXI.AnimatedSprite(textures);
    }

    for (let i = 0; i < 5; i++) {

        const cnv = document.createElement("canvas");        
        const ctx = cnv.getContext("2d");
        
        
        
        
        let frame = i;
        const draw = () => {
          
          const h = 128;//512;
          const w = 32;//256;
          cnv.width = w;
          cnv.height = h;
          
        //   ctx.beginPath();
        //   ctx.fillStyle = "rgb(255,155,0)";
        //   ctx.fillRect(0,0,w,h);
        //   ctx.fill();
          
          
          ctx.strokeStyle = "#67e8f9";
          ctx.shadowColor = '#cffafe';
          ctx.fillStyle = "#67e8f9";
          ctx.lineWidth = w/32;
          ctx.shadowBlur = w/16;

          const dropW = w * 0.1;
        
          ctx.beginPath();
          if (frame === 0) {
            ctx.fillRect(w/2 - dropW/2, h*0.05, dropW, h * 0.13);
          } else if (frame === 1) {
             ctx.fillRect(w/2 - dropW/2, h*0.25, dropW, h * 0.22);
          } else if (frame === 2) {
            ctx.fillRect(w/2 - dropW/2, h*0.50, dropW, h * 0.25);
          } else if (frame === 3) {
            ctx.fillRect(w/2 - dropW/2, h*0.75, dropW, h * 0.18);
            ctx.ellipse(w/2, h - w * 15/100, w * 0.225, w * 0.05, 0, Math.PI*2, 0, false);
          } else {
            ctx.ellipse(w/2, h - w * 15/100, w * 0.45, w * 0.1, 0, Math.PI*2, 0, false);
          }
          ctx.stroke();
          // window.requestAnimationFrame(draw);
        };

        draw();


        
        textures.push(PIXI.Texture.from(cnv));
        document.body.appendChild(cnv)
    };
  
    return new PIXI.AnimatedSprite(textures);
    // return new PIXI.Sprite(textures[1]);

};
  