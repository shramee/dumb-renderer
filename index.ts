interface DumbRendererConstructor {
  new (): DumbRenderer;
}

declare global {
  interface Window {
    DumbRenderer: DumbRendererConstructor;
  }
}

interface CanvasProps {
  h?: number;
  w?: number;
  bg?: string;
}

type TransformationArr = readonly [number, number, number, number, number, number];

/**
 * Asset states can render a new object (image)
 * or apply some transformation to base asset image
 */
interface AssetState {
  src?: string;
  transform?: TransformationArr;
}

interface Asset {
  id: string;
  src: string;
  w?: number;
  h?: number;
  transform?: TransformationArr;
  states?: {
    [key: string]: string | AssetState;
  };
}

/**
 * Asset states can render a new object (image)
 * or apply some transformation to base asset image
 */
interface LoadedAssetState {
  img: HTMLImageElement;
  transform?: TransformationArr;
  w?: number;
  h?: number;
}

interface RenderAsset {
  id: string;
  state?: string;
  x: number;
  y: number;
  transform?: TransformationArr;
  h?: number;
  w?: number;
}

interface RenderableAssetState {
  img: HTMLImageElement;
  transform?: TransformationArr;
  h: number;
  w: number;
}

interface LoadedAsset extends RenderableAssetState {
  id: string;
  states: {
    [key: string]: LoadedAssetState;
  };
}

/**
 * Gets game ID from the URL.
 * Queries game data for the game ID.
 * Game data includes
 * - canvas: {w, h} // Canvas width and height
 * - assets: [asset1, asset2] // Assets to load (image urls)
 * - bids: [bid] Bidding options
 * Creates the canvas with size from game data.
 * Loads the assets.
 * Connects to the socket.
 * Renders objects whenever state update is received.
 */
class DumbRenderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  bg: string;
  baseObjects: RenderAsset[] = [];
  assets: { [key: string]: LoadedAsset } = {};
  dummyImg: HTMLImageElement = new Image();

  loadAssets(assets: Asset[]) {
    return new Promise((res, rej) => {
      let imagesToLoad = 0;
      let imagesLoaded = 0;
      const assetLoaded = () => {
        imagesLoaded++;
        setTimeout(() => {
          if (imagesLoaded === imagesToLoad) res(true);
        }, 1);
      };
      const fnLoadAsset = (src, w_hObject) => {
        imagesToLoad++;
        const img = new Image();
        img.src = src;
        img.onload = () => {
          assetLoaded();
          w_hObject.h = w_hObject.h || img.height;
          w_hObject.w = w_hObject.w || img.width;
        };
        return img;
      };

      assets.forEach(this.prepareAsset(fnLoadAsset));
    });
  }

  prepareAsset(loadAsset: (src: string, w_hObj: {}) => HTMLImageElement): (a: Asset) => void {
    return ({ id, src, states, w, h }) => {
      // Load base image
      const loadedAsset: LoadedAsset = {
        w: w || 0, // Use image size if not specified
        h: h || 0, // Use image size if not specified
        id,
        img: this.dummyImg,
        states: {},
      };
      const baseImg = loadAsset(src, loadedAsset);
      loadedAsset.img = baseImg;
      // Load state images
      if (states) {
        Object.keys(states).forEach((state) => {
          let stateData: AssetState;
          let stateImg = baseImg;

          if (typeof states[state] === "string") {
            stateData = {
              // @ts-ignore: states[state] is definitely string at this point
              src: states[state],
            };
          } else {
            // @ts-ignore: states[state] is definitely AssetState at this point
            stateData = states[state]; //
          }

          if (stateData.src) {
            stateImg = loadAsset(stateData.src, {});
          }
          loadedAsset.states[state] = {
            img: stateImg,
            transform: stateData.transform,
          };
        });
      }

      this.assets[id] = loadedAsset;
    };
  }

  setupCanvas(canvasProps: CanvasProps) {
    this.bg = canvasProps.bg || "#2c3e50";
    this.canvas = document.createElement("canvas");
    this.canvas.id = "game";
    this.canvas.width = canvasProps.w || 800;
    this.canvas.height = canvasProps.h || 450;

    document.body.appendChild(this.canvas);

    const ctx = this.canvas.getContext("2d");

    if (ctx) this.ctx = ctx;
    this.clearCanvas();
  }

  clearCanvas() {
    if (!this.ctx) throw new Error("Failed to get Canvas context, did you setupCanvas?");
    this.ctx.fillStyle = this.bg;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  baseRender(objects: RenderAsset[]) {
    this.baseObjects = objects;
  }

  locateAssetImageToRender(assetToLocate: RenderAsset): RenderableAssetState | null {
    const { id, state } = assetToLocate;
    const asset: LoadedAsset = this.assets[id];
    if (asset) {
      let renderableAssetState = { ...asset };
      if (state && asset.states[state]) {
        renderableAssetState = {
          ...renderableAssetState,
          ...asset.states[state],
        };
      }
      return renderableAssetState;
    }

    return null;
  }

  render(objects: RenderAsset[]) {
    this.clearCanvas();
    this.baseObjects.forEach((asset) => this.renderAsset(asset));
    objects.forEach((asset) => this.renderAsset(asset));
  }

  renderAsset(render: RenderAsset) {
    const renderable: RenderableAssetState | null = this.locateAssetImageToRender(render);

    if (renderable) {
      console.log(renderable);
      if (renderable.transform) {
        console.log(this.ctx.getTransform());
        console.log(renderable.transform);
        this.ctx.translate(render.x, render.y);
        this.ctx.transform(...renderable.transform);
        console.log(this.ctx.getTransform());
        this.ctx.drawImage(renderable.img, 0, 0, renderable.w, renderable.h);
        this.ctx.resetTransform();
      } else {
        this.ctx.drawImage(renderable.img, render.x, render.y, renderable.w, renderable.h);
      }
    } else {
      this.ctx.fillStyle = this.bg;
      this.ctx.ellipse(
        render.x,
        render.y,
        render.w || 50,
        render.h || 50,
        Math.PI / 4,
        0,
        2 * Math.PI
      );
    }
  }
}

if (window) {
  window.DumbRenderer = DumbRenderer;
}

export default DumbRenderer;
