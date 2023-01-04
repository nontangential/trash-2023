const cnv = document.createElement("canvas");
document.body.appendChild(cnv);
let w, h;
const resize = () => {
  w = cnv.width = window.innerWidth;
  h = cnv.height = window.innerHeight;
};
window.addEventListener("resize", resize)
resize();

const ctx = cnv.getContext("2d");

///////////////////////
const aabb = (x1,y1,w1,h1, x2,y2,w2,h2) => {
    return (
      x1 < x2 + w2 &&
      x1 + w1 > x2 &&
      y1 < y2 + h2 &&
      y1 + h1 > y2
    );
}

const projectiles = {
  list: [],
  init: () => {  
  },
  add: (px, py, vx,vy) => {
    projectiles.list.push({
      s: 5,
      p: [px, py],
      v: [vx, vy],
      collided: false
    })
  },
  draw: () => {
    projectiles.list.forEach(proj => {
      proj.p[0] += proj.v[0] * 3;
      proj.p[1] += proj.v[1] * 3;
      
      enemies.list.forEach(en => {
        if (aabb(proj.p[0], proj.p[1], proj.s, proj.s, en.p[0], en.p[1], en.s, en.s)) {
          en.hp -=1;
          proj.collided = true;
        }
      })
      
      ctx.fillStyle = `rgb(0,0,0)`;
      ctx.fillRect(proj.p[0], proj.p[1], proj.s, proj.s);
    });
    projectiles.list = projectiles.list.filter(p => !p.collided);
    ctx.fill();
  }
};

const map = {
  init: () => {
    
  },
  draw: () => {
    
  }
};

const enemies = {
  list: [],
  init: () => {
    
  },
  maxhp: 3,
  timer: 0,
  add: () => {
      const en = {
        p: [Math.random()*w, Math.random()*h],
        s: 50,
        hp: Math.ceil(Math.random()*enemies.maxhp)
      };
      if (Math.random() > .5) {
        en.p[0] = Math.random() > .5 ? -25 : w-25;
      } else {
        en.p[1] = Math.random() > .5 ? -25 : h-25;
      }
      enemies.list.push(en);;
  },
  draw: () => {
    const t = performance.now();
    if (t - enemies.timer > 1000) {
      enemies.timer = t;
      enemies.add();
    }
    enemies.list.forEach(en => {
      const d = [player.p[0] - en.p[0], player.p[1] - en.p[1]]
      const hypot = Math.hypot(d[0], d[1]);
      en.p[0] += d[0]/hypot*0.1;
      en.p[1] += d[1]/hypot*0.1;
      
      /////
      if (aabb(player.p[0], player.p[1], player.s, player.s, en.p[0], en.p[1], en.s, en.s)) {
        enemies.list.length = 0;
      }
      /////
      ctx.fillStyle = `rgba(255,0,0, ${en.hp/enemies.maxhp})`;
      ctx.fillRect(en.p[0], en.p[1], en.s, en.s);
    });
    enemies.list = enemies.list.filter(en => en.hp > 0);
    ctx.fill();
  }
};

const player = {
  s: 50,
  p: [w/2-25, h/2-25],
  keys: [0,0,0,0],
  init: () => {
    window.addEventListener("keydown", ({key}) => {
      if (key === "w") player.keys[0] = 1;
      if (key === "s") player.keys[1] = 1;
      if (key === "a") player.keys[2] = 1;
      if (key === "d") player.keys[3] = 1;
    });
    window.addEventListener("keyup", ({key}) => {
      if (key === "w") player.keys[0] = 0;
      if (key === "s") player.keys[1] = 0;
      if (key === "a") player.keys[2] = 0;
      if (key === "d") player.keys[3] = 0;
    });
  },
  timer: 0,
  draw: () => {
    const t = performance.now();
    
    const dir = [player.keys[3] - player.keys[2], player.keys[1] - player.keys[0]]

    player.p[0] += dir[0] * 1.2;
    player.p[1] += dir[1] * 1.2;
    
    if (t - player.timer > 300) {
      player.timer = t;
      let r = [1, 1];
      if (Math.abs(dir[0]) || Math.abs(dir[1])) {
        r[0] = dir[0];
        r[1] = dir[1];
      } else {
        r[Math.floor(Math.random() + 0.5)] = (Math.random() > 0.5) ? -1 : 0
      }
      projectiles.add(player.p[0] + player.s/2, player.p[1] + player.s/2, r[0], r[1])
    }
    
    ctx.fillStyle = "rgba(255,155,0, 1.0)";
    ctx.fillRect(player.p[0], player.p[1], player.s, player.s);
    ctx.fill();
  }
};

////////////////////////
map.init();
enemies.init();
player.init();
projectiles.init();
////////////////////////

const draw = () => {
  ctx.clearRect(0,0, w, h)
  map.draw();
  enemies.draw();
  player.draw();
  projectiles.draw();
  window.requestAnimationFrame(draw);
};
window.requestAnimationFrame(draw);