interface Asset {
  id: string;
  url: string;
  states?: { [key: string]: string };
}

interface LoadedAsset {
  id: string;
  img: HTMLImageElement;
  states?: { [key: string]: HTMLImageElement };
}

interface CanvasProps {
  h: number;
  w: number;
}
interface DumbRendererConstructor {
  new (): DumbRenderer;
}

declare global {
  interface Window {
    DumbRenderer: DumbRendererConstructor;
  }
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
  assets: { [key: string]: LoadedAsset };

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
    return ({ id, url, states }) => {
      // Load base image
      this.assets[id] = {
        id,
        img: loadAsset(url),
        states: {},
      };

      // Load state images
      if (states) {
        Object.keys(states).forEach((state) => {
          const url = states[state];
          this.assets[id][state] = loadAsset(url);
        });
      }
    };
  }

  async setupCanvas(canvasProps: CanvasProps) {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "game";
    this.canvas.width = canvasProps.w;
    this.canvas.height = canvasProps.h;

    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");
  }
}

if (window) {
  window.DumbRenderer = DumbRenderer;
}

export default DumbRenderer;
