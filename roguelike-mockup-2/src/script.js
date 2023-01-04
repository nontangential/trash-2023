const cnv = document.createElement("canvas");
document.body.appendChild(cnv);
let w, h, rs;
const resize = () => {
  w = cnv.width = window.innerWidth;
  h = cnv.height = window.innerHeight;
  rs = w/10;
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
};

const getInterval = (cb, time) => {
  let start = performance.now();
  return {
    update: () => {
      const t = performance.now();
      if (t - start > time) {
        start = t;
        cb();
      }
    }
  }
};

const getView = (x,y,vx,vy,w,h) => {
  const obj = {
    p: [x, y],
    v: [vx, vy],
    s: [w, h],
    update: () => {
      obj.p[0] += obj.v[0];
      obj.p[1] += obj.v[1];
    },
    collideRect: (x,y,w,h) => aabb(obj.p[0], obj.p[1], obj.s[0], obj.s[1], x,y,w,h),
    collideView: (view) => obj.collideRect(view.p[0], view.p[1], view.s[0], view.s[1]),
    drawFill: (ctx, col, ...args) => {
      if (typeof col === "number") {
        ctx.fillStyle = "#" + col.toString(16);
      } if (col === "rgba") {
        ctx.fillStyle = `rgba(${args.toString()})`;
      }
      ctx.fillRect(obj.p[0], obj.p[1], obj.s[0], obj.s[1]);
    },
    destroyed: false,
  };
  return obj;
};


/////////////////////

const logic = {
  lose: () => {
    player.p[0] = w/2;
    player.p[1] = h/2;
    enemies.list.length = 0;
    projectiles.list.length = 0;
  }
}


/////////////////////
const projectiles = {
  list: [],
  spawn: (px, py, vx,vy, dmg) => {
    projectiles.list.push(Object.assign(getView(px,py,vx*2,vy*2,5,5), {dmg}));
  },
  draw: () => {
    projectiles.list.forEach(proj => {
      proj.update();
      enemies.list.forEach(en => {
        if (!en.destroyed && !proj.destroyed && proj.collideView(en)) {
          en.hp -= proj.dmg;
          proj.destroyed = true;
          if (en.hp < 0) en.destroyed = true;
        }
      });
      proj.drawFill(ctx, "rgba", 0, 0, 0, 1);
    });
    projectiles.list = projectiles.list.filter(p => !p.destroyed);
    ctx.fill();
  }
};

const map = {
  draw: () => {}
};

const ui = {
  draw: () => {}
};

const enemies = {
  list: [],
  maxhp: 30,
  add: () => {
      const en = getView(Math.random()*w, Math.random()*h,0,0,50,50);
      en.hp = Math.ceil(Math.random()*enemies.maxhp)

      if (Math.random() >.5) {
        en.p[0] = Math.random() > .5 ? -en.s[0]/2 : w-en.s[0]/2;
      } else {
        en.p[1] = Math.random() > .5 ? -en.s[1]/2 : h-en.s[1]/2;
      }
      enemies.list.push(en);
    console.log("SPAWN", en.p, en.s, en.hp, w,h, enemies.list.length)
  },
  timer: null,
  init: () => {
    enemies.timer = getInterval(() => enemies.add(), 1000)
  },
  draw: () => {
    enemies.timer?.update();
    let playerCollided = false;
    enemies.list.forEach(en => {
      const d = [player.p[0] - en.p[0], player.p[1] - en.p[1]]
      const hypot = Math.hypot(d[0], d[1]);
      en.v[0] = d[0]/hypot*0.1;
      en.v[1] = d[1]/hypot*0.1;
      
      en.update();
      if (en.collideView(player)) {
        playerCollided = true;
        console.log(player.p, player.s, "losing to ", en.p, en.s)
      }
      en.drawFill(ctx, "rgba", 255, 0, 0, 1.0);
    });
    ctx.fill();
    enemies.list = enemies.list.filter(en => !en.destroyed);
    if (playerCollided) logic.lose();
  }
};

const player = Object.assign(getView(w/2-25, h/2-25, 0,0, 50,50), {
  keys: {up: 0, down: 0, left: 0, right: 0},
  timers: [],
  weapons: {
    dot: {delay: 300, dmg: 10, on: true},
    fast: {delay: 30, dmg: 1, on: false}
  },
  init: () => {
    const setKey = (key, value) => {
      if (key === "w") player.keys.up = value;
      if (key === "s") player.keys.down = value;
      if (key === "a") player.keys.left = value;
      if (key === "d") player.keys.right = value;
      
      if (key === "1" && value) { player.weapons.dot.on = true; player.weapons.fast.on = false; }
      if (key === "2" && value) { player.weapons.dot.on = false; player.weapons.fast.on = true; }
      if (key === "3" && value) { player.weapons.dot.on = false; player.weapons.fast.on = false; }

    }
    window.addEventListener("keydown", ({key}) => setKey(key, 1));
    window.addEventListener("keyup", ({key}) => setKey(key, 0));
    
    player.timers.push(getInterval(() => {
      if (player.weapons.dot.on) player.spawnProjectiles(player.weapons.dot.dmg)
    }, player.weapons.dot.delay));
    player.timers.push(getInterval(() => {
      if (player.weapons.fast.on) player.spawnProjectiles(player.weapons.fast.dmg)
    }, player.weapons.fast.delay));
  },
  spawnProjectiles: (dmg) => {
    const v = [player.v[0], player.v[1]];
    if (v[0] === 0 && v[1] === 0) {
      v[Math.floor(Math.random() + 0.5)] = (Math.random() > 0.5) ? -1 : 1
    }
    projectiles.spawn(player.p[0] + player.s[0]/2, player.p[1] + player.s[1]/2, v[0], v[1], dmg)
  },
  draw: () => {
    player.timers.forEach(t => t.update());
    
    const dir = [player.keys.right - player.keys.left, player.keys.down - player.keys.up];
    player.v[0] = dir[0] * 1.2;
    player.v[1] = dir[1] * 1.2;;
    
    player.update();
    
    player.drawFill(ctx, 0x84CC16);
    ctx.fill();
  }
});

////////////////////////
enemies.init?.();
player.init?.();
projectiles.init?.();
ui.init?.();
////////////////////////

const draw = () => {
  ctx.fillStyle = "#ECFCCB50";
  ctx.fillRect(0,0, w, h)
  enemies.draw();
  player.draw();
  projectiles.draw();
  ui.draw();
  window.requestAnimationFrame(draw);
};
window.requestAnimationFrame(draw);