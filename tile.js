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
      .attr("stroke", "black");
  }
}

function start(heightMap, heightTile) {
  const listTile = [];
  d3.select("body")
    .append("svg")
    .attr("width", heightMap)
    .attr("height", heightMap)
    .attr("id", "grid")
    .attr("fill", "red");
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      listTile.push(new Tile(x, y, heightTile, "dirt"));
    }
  }
  let lapin = new Creature(0+heightTile/2,0+heightTile/2,1,1,1,1,heightTile);
    console.log(lapin);
    console.log(lapin.getX()+", "+lapin.getY());
}
