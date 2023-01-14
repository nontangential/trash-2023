export const genetateLightningSprite = function () {

  const cnv = document.createElement("canvas");
  let w = cnv.width = 512
  let h = cnv.height = 512;


  const ctx = cnv.getContext("2d");

  let points = [];
  const lines = [];


      const ww = 512;
      const hh = 485;
      const xStep = ww / 5;
      const xStepMin = ww / 12;
      const yStep = hh / 16;
      const yStepMin = hh / 32;

      let x = 0;
      let y = hh;
      let i = 0;

      lines.length = 0;
      points.length = 0;
      points.push([x + ww / 2, y]);

      while (y > 0 && i < 100) {
        y -= Math.random() * yStep + i * 2 + yStepMin;
        if (y < 0) {
          y = 0;
        }

        const dx =
          Math.random() * xStep - xStep / 2 + (Math.random() - 0.5) * xStepMin;
        if (x + dx > ww / 2) {
          x -= dx;
        } else if (x + dx < -ww / 2) {
          x -= dx;
        } else {
          x += dx;
        }

        points.push([x + ww / 2, y]);
        i++;
      }

      for (let passes = 0; passes < 4; passes++) {
        lines.push(points);

        const nextPoints = [];
        for (let i = 0; i < points.length; i++) {
          nextPoints.push([
            points[i][0], // + (Math.random() - 0.5) * (i + 4),
            points[i][1], // + Math.random() * 4
          ]);
        }
        lines.push(nextPoints);
      }
      

      for (let i = 0; i < lines.length; i++) {
        // const frameVar = 1/(maxFrames-frame);
        const frameVar = 1 / (lines.length - i);

        ctx.strokeStyle = "#E0F2FE";
        ctx.shadowColor = "#7DD3FC";
        ctx.lineCap = "round";
        // ctx.lineJoin = "bevel";
        ctx.lineWidth = 4 * frameVar + 2;
        ctx.shadowBlur = 12 * frameVar + 4;
        ctx.shadowOffsetX = 0; //(Math.random() - 0.5) * frameVar * 10;
        ctx.shadowOffsetY = 0;

        ctx.beginPath();

        points = lines[i];

        ctx.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(
            // points[i][0] + Math.random() * ctx.lineWidth,
            points[i][0] + (Math.random() - 0.5) * (i + ctx.lineWidth),

            points[i][1] + Math.random() * ctx.lineWidth
          );
        }
        ctx.stroke();
      }



  const spr = PIXI.Sprite.from(cnv);
  spr.pivot.set(ww/2, hh);
  return spr;
};
