(async (DumbRenderer) => {
  const renderer = new DumbRenderer();

  renderer.setupCanvas({
    w: 1024,
    h: 576,
    bg: "#0cf",
  });

  const assets = {
    user: "https://cdn.jsdelivr.net/npm/font-awesome-svg-icons@0.1.0/svg/user.svg",
    asterisk: "https://cdn.jsdelivr.net/npm/font-awesome-svg-icons@0.1.0/svg/asterisk.svg",
    times: "https://cdn.jsdelivr.net/npm/font-awesome-svg-icons@0.1.0/svg/times.svg",
  };

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
  for (const asset in assets) {
    assetsArr.push({
      id: asset,
      src: assets[asset],
      w: 70,
      h: 70,
    });
  }

  // Wait for assets to load
  await renderer.loadAssets(assetsArr);

  // Can be called to render again after changes
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
})(window.DumbRenderer);
