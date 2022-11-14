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

  async loadImage(imageUrl) {
    var img = new Image();
    img.src = imageUrl;
    return img;
  }

  async loadAssets(assets: Asset[]) {
    return new Promise((res, rej) => {
      assets.forEach((asset) => {
      });
    });
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

new DumbRenderer();
