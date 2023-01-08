export class AssetManager {


    assetMap = new Map();

    constructor() {

    }
    async load() {
        console.log("AHAH")
        await PIXI.Assets.load('assets/bunny.png');
        await PIXI.Assets.load('assets/txtr.png');

    }
}