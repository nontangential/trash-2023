import { BASIC_ASSETS } from "../assetManagement/BasicAssets";
import { getRenderer, getScreenSize } from "../game/globalGameAPI";

export class CenteredGameStage {
  view = new PIXI.Container();
  
  constructor() {
    getRenderer().on("resize", () => {      
      this.updatePosition();
    });
    
    this.updatePosition();
  }
  getArea() {
    return this._area;
  }
  getCenter() {
    return this.getCenter();
  }
  
  _getLimit = () => ({width: 640, height: 480})
  limitTo(cb) {
    this._getLimit = cb;
    this.updatePosition();
  }
  _getCenter = () => new PIXI.Point(0, 0);
  centerAround(cb) {
    this._getCenter = cb;
    this.updatePosition();
  }

  _area = new PIXI.Rectangle(0,0, 640, 480)
  updatePosition() {
    if (this._getCenter && this._getLimit) {
      const {width, height} = this._getLimit();
      const {x, y} = this._getCenter();
      
      this._area.x = -width / 2 + x;
      this._area.y = -height / 2 + y
      this._area.width = width;
      this._area.height = height
      this.view.pivot.set(this._area.x, this._area.y);
    }
  }

  update() {
    this.updatePosition()
  }
}
