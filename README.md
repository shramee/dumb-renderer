# dumb-renderer
A dumb HTML5 canvas renderer.

### Init Renderer

```js
const renderer = new DumbRenderer();
```

### Setup Canvas

```ts
interface CanvasProps {
  h?: number;
  w?: number;
  bg?: string;
}
```

Example:
```js
renderer.setupCanvas({
  w: 1024,
  h: 576,
  bg: "#0cf",
});
```

### Load assets

Pass in an array of assets to load.

```ts
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
```

Example:
```js
  const assetsArr = [
    {
      id: "circle",
      src: "https://cdn.jsdelivr.net/npm/font-awesome-svg-icons@0.1.0/svg/circle-o.svg",
      w: 50,
      h: 50,
      states: {
        dot: "https://cdn.jsdelivr.net/npm/font-awesome-svg-icons@0.1.0/svg/dot-circle-o.svg",
        squish: {
          transform: [1.0, 0.0, 0.0, 0.1, 0, 0],
        },
      },
    },
  ];

  // Wait for assets to load
  await renderer.loadAssets(assetsArr);
```

### Render stuff

```ts
interface RenderAsset {
  id: string;
  state?: string;
  x: number;
  y: number;
  transform?: TransformationArr;
  h?: number;
  w?: number;
}
```

```js
  renderer.render([
    {
      id: "asterisk",
      x: 200,
      y: 100,
    },
    {
      id: "circle",
      state: "dot",
      x: 300,
      y: 200,
    },
    {
      id: "circle",
      state: "squish",
      x: 500,
      y: 100,
    },
    {
      id: "user",
      x: 500,
      y: 250,
    },
  ]);
```
