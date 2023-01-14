import { createNoise2D } from "https://cdn.skypack.dev/simplex-noise@4.0.0";

export const fluidPoints = function(stage, ticker, renderer) {

    const w = 256;
    const h = 512;


    // const input = PIXI.RenderTexture.create({width: w, height: h});


    const geometry = new PIXI.Geometry()
    .addAttribute('aVertexPosition', // the attribute name
        [-100, -100, // x, y
        100, -100, // x, y
        100, 100,
        -100, 100], // x, y
        2) // the size of the attribute
    .addAttribute('aUvs', // the attribute name
        [0, 0, // u, v
        1, 0, // u, v
        1, 1,
        0, 1], // u, v
        2) // the size of the attribute
    .addIndex([0, 1, 2, 0, 2, 3]);

    // const mesh = new PIXI.SimplePlane();


    const vertexSrc = `
    precision mediump float;

    attribute vec2 aVertexPosition;
    attribute vec2 aUvs;

    uniform mat3 translationMatrix;
    uniform mat3 projectionMatrix;

    varying vec2 vUvs;

    void main() {
        vUvs = aUvs;
        gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    }`;


    const pointsLength = 20;
    const fragmentSrc = `
    precision mediump float;

    varying vec2 vUvs;

    uniform sampler2D texture;
    uniform float time;

    uniform vec2 points[${pointsLength}];
    float pointSize = 0.2;

    // float rand(vec2 co){
    //     return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
    // }

    void main() {
        vec2 uv = vec2(vUvs.x, vUvs.y);
        uv *=2.;
        uv-=1.;

        // float pointSize = rand(points[0]) * 0.1;

        // vec3 col = texture2D(texture, uv).xyz;
        vec3 col = vec3(0.0);

        float colored = 1.0;
        for(int i = 0; i < ${pointsLength}; i++) {
            float distI = distance(uv, points[i]);

            colored *= smoothstep(pointSize * 0.8, pointSize*1.4, distI);
        }
        float joinedPoints = step(pointSize, colored);

        col = vec3(1.0 - joinedPoints);

        // col.b = step(pointSize + 0.1, colored);

        gl_FragColor = vec4(col, 1.);
    }`;


    const noise2D = createNoise2D();
    let time = performance.now() * 0.001;

    const getPoints = (num, seed) => {
        const points = [];
        for (let i = 0; i < num; i++){
            points.push(noise2D(seed + i * 322, seed + i * 2456) *0.5 + .5);
            points.push(noise2D(seed + i * 9090, seed + i * 234654) *0.5 + .5)
        }
        return points;
    }

    const uniforms = {
        noise: PIXI.Texture.from('a'),
        time: 0,
        points: getPoints(pointsLength, time * 0.1)
    };


    const shader = PIXI.Shader.from(vertexSrc, fragmentSrc, uniforms);
    const mesh = new PIXI.Mesh(geometry, shader);
    mesh.scale.set(5)


    const bg = PIXI.Sprite.from("a");
    stage.addChild(bg);
    
    // stage.addChild(mesh);

    const renderText = PIXI.RenderTexture.create({width: 500, height: 500});
    const sprite = new PIXI.Sprite(renderText)
    // bg.mask = mesh;
    bg.mask = sprite;
    stage.addChild(sprite);


    ticker.add(() => {
        time = performance.now() * 0.001;
        uniforms.points = getPoints(pointsLength, time * 0.1);
        
        renderer.render(mesh, {
            renderTexture: renderText,
            clear: true
        });
    });
}