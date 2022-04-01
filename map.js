class Tile {
  constructor(x, y, heightTile, tileType) {
    this.x = x;
    this.y = y;
    this.tileType = tileType;
    d3.select("#grid")
      .append("rect")
      .attr("x", this.x)
      .attr("y", this.y)
      .attr("width", heightTile)
      .attr("height", heightTile)
      .attr("x", x * heightTile)
      .attr("y", y * heightTile)
      .attr("stroke", "black")
      .attr("id", tileType)
      .attr("fill", function (d) {
        if (tileType === "rock") {
          return rock["color"];
        } else if (tileType === "soil") {
          return soil["color"];
        } else if (tileType === "grass") {
          return grass["color"];
        } else if (tileType === "forest") {
          return forest["color"];
        } else if (tileType === "water") {
          return water["color"];
        }
      });
  }
}

function map(heightMap, heightTile, nbPlayers) {
  const listTile = [];

  d3.select("body")
    .append("svg")
    .attr("width", heightMap)
    .attr("height", heightMap)
    .attr("id", "grid");
  for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
      let tileType = tileTotal[Math.floor(Math.random() * tileTotal.length)];
      listTile.push(new Tile(x, y, heightTile, tileType));
    }
  }
  console.log(listTile[0].tileType);
}
