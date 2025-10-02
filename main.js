// java script goes here
  const palettes = {
    mountain: [
      ["#fefae0", "#FCF75E", "#ffb4a2", "#e5989b", "#b5838d", "#6d6875"], // default
      ["#023e8a", "#caf0f8", "black", "#03045e", "#023e8a", "#48cae4"]  // hover
    ],
    ocean: [
      ["#023e8a", "#caf0f8", "#03045e", "#48cae4"], // default
      ["#fefae0", "#FCF75E", "#b5838d", "#ffb4a2"] // hover
    ]
  };

    function applyPalette(svg, palette) {
        const shapes = svg.querySelectorAll("polygon, circle, line");
        shapes.forEach((shape, i) => {
            shape.setAttribute("fill", palette[i]);
        });
    }

    document.querySelectorAll("svg").forEach(svg => {
      const type = svg.classList.contains("mountain") ? "mountain" : "ocean";
      svg.addEventListener("mouseenter", () => applyPalette(svg, palettes[type][1]));
      svg.addEventListener("mouseleave", () => applyPalette(svg, palettes[type][0]));
    });