const { TILE_TYPES } = require("./utils/constants.js");

class Tile {
  constructor(x, y, height, type, species) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.species = species;
    this.draw(height);
  }

  draw(height) {
    // eslint-disable-next-line no-undef
    this.tile = d3
      .select("#grid")
      .append("rect")
      .attr("id", `${this.x};${this.y}`)
      .attr("width", height)
      .attr("height", height)
      .attr("x", this.x * height)
      .attr("y", this.y * height)
      .attr("stroke", "black")
      //.on("click", console.log(this.tileType))
      .attr("fill", this.type.color);
  }

  setType(type) {
    this.type = type;
    this.tile.attr("fill", this.type.color);
  }

  toHole(species) {
    this.setType(TILE_TYPES.HOLE);
    this.species = species;
  }
}

module.exports = Tile;
