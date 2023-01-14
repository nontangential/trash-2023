export const generateSimpleLightning = () => {
    const g = new PIXI.Graphics();
    const width = 512;
    const height = 512;

    for (
      let i = 0,
        x = Math.random() * width - width / 2,
        y = -height / 2,
        w = 10,
        l = 100;
      i < 10;
      i++
    ) {
      g.lineStyle(w, 0x7DD3FC, 1);//1/i);

      g.moveTo(x, y);
      x += Math.random() * l - l / 2;
      g.lineTo(x, y + l);
      y += l;
      w -= 1;
      l *= 0.8;
    }
    g.closePath();
    return g;
};

export const generateMultipassLightning = () => {
  const g = new PIXI.Graphics();
  const width = 512;
  const height = 512;

  g.line
  for (
    let i = 0,
      x = Math.random() * width - width / 2,
      y = -height / 2,
      w = 4,
      l = 100;
    i < 14;
    i++
  ) {
    let c = Math.floor(Math.random() * 50)
    g.lineStyle(w, (0x7D - c) * 256 * 256 +  (0xD3 - c) * 256 + (0xFC - c), 1);

    const dx = Math.random() * l*2 - l*2 / 2;
    // g.moveTo(x, y);
    for (let j = 0; j < 4; j++) {
      g.moveTo(x + Math.random() * 8, y + Math.random() * 8);
      g.lineTo(x + dx + Math.random() * 8, y + l + Math.random() * 8);
    }
    x += dx;
    y += l;
    // w -= 1;
    l *= 0.8;
  }
  g.closePath();
  return g;
}