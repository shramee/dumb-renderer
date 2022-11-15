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

/**
 * Asset states can render a new object (image)
 * or apply some transformation to base asset image
 */
interface AssetState {
  src?: string;
  transform?: string;
}

interface Asset {
  id: string;
  src: string;
  size?: {
    w: number;
    h: number;
  };
  transform?: string;
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
  transform?: string;
}

interface LoadedAsset {
  id: string;
  img: HTMLImageElement;
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
  ctx: CanvasRenderingContext2D | null;
  bg: string;
  baseObjects: {} = [];
  assets: { [key: string]: LoadedAsset } = {};

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
      const fnLoadAsset = (src) => {
        imagesToLoad++;
        const img = new Image();
        img.src = src;
        img.onload = assetLoaded;
        return img;
      };

      assets.forEach(this.prepareAsset(fnLoadAsset));
    });
  }

  prepareAsset(
    loadAsset: (src: string) => HTMLImageElement
  ): (a: Asset) => void {
    return ({ id, src, states }) => {
      const baseImg = loadAsset(src);
      // Load base image
      const loadedAsset: LoadedAsset = {
        id,
        img: baseImg,
        states: {},
      };

      // Load state images
      if (states) {
        Object.keys(states).forEach((state) => {
          let stateData: AssetState;
          let stateImg = baseImg;

          if (typeof states[state] === "string") {
            stateData = {
              src: states[state],
            };
          } else {
            stateData = states[state];
          }

          if (stateData.src) {
            stateImg = loadAsset(stateData.src);
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

    this.ctx = this.canvas.getContext("2d");
    this.clearCanvas();
  }

  clearCanvas() {
    if (!this.ctx) throw new Error("Failed to set up context.");
    this.ctx.fillStyle = this.bg;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

if (window) {
  window.DumbRenderer = DumbRenderer;
}

export default DumbRenderer;
