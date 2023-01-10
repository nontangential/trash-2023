export class AssetManager {

    assetMap = new Map();

    mapAssets(assetMap) {
        for(let name in assetMap) {
            this.assetMap.set(name, assetMap[name])
        }
    }

    async loadAssets(assetList) {
        const assetNames = assetList.map(asset => {
            PIXI.Assets.add(asset.name, [asset.url]);
            return PIXI.Assets.load(asset.name);
        });
        await Promise.all(assetNames);
    }
    
    async generateAssets() {
    }
}