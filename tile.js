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


