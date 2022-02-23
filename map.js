function map(heightMap, heightTile) {
  var tile = ["soil", "grass", "rock", "forest", "water"]
  var svg = d3.select("body").append("svg").attr("width", heightMap).attr("height", heightMap);
  for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
   let randomColor = Object.values(tile)[Math.floor(Math.random() * Object.values(tile).length)]
   let randomID = tile[Math.floor(Math.random() * tile.length)]
        svg.append("rect")
        .attr("width", heightMap)
        .attr("height", heightMap)
        .attr("x", x*heightTile)
        .attr("y", y*heightTile)
        .attr("stroke", "black")
        .attr("id", randomID)
        .attr("fill", function(d) {
          if (randomID === "water") {
            return "#aed6f1";
          } else if (randomID === "soil") {
            return "#a04000";
          } else if (randomID === "grass") {
            return "#81c784";
          } else if (randomID === "forest") {
            return "#0e6655";
          } else if (randomID === "rock") {
            return "#cacfd2";
          }
        });

      }
    }
  }
