(async (DumbRenderer) => {
  const renderer = new DumbRenderer();

  renderer.setupCanvas({
    w: 800,
    h: 450,
  });

  const assets = {
    user: "https://cdn.jsdelivr.net/npm/font-awesome-svg-icons@0.1.0/svg/user.svg",
    asterisk:
      "https://cdn.jsdelivr.net/npm/font-awesome-svg-icons@0.1.0/svg/asterisk.svg",
    times:
      "https://cdn.jsdelivr.net/npm/font-awesome-svg-icons@0.1.0/svg/times.svg",
  };

  const assetsArr = [
    {
      id: "circle",
      src: "https://cdn.jsdelivr.net/npm/font-awesome-svg-icons@0.1.0/svg/circle-o.svg",
      states: {
        dot: "https://cdn.jsdelivr.net/npm/font-awesome-svg-icons@0.1.0/svg/dot-circle-o.svg",
        squish: {
          transform: "1.00,0.00,0.00,0.10,0,0",
        },
      },
    },
  ];
  for (asset in assets) {
    assetsArr.push({
      id: asset,
      src: assets[asset],
    });
  }
  console.log(assetsArr);

  // Wait for assets to load
  await renderer.loadAssets(assetsArr);

  console.log(renderer.assets);
})(window.DumbRenderer);
