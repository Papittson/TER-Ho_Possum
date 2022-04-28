const { TILE_TYPES } = require("../utils/constants.js");

class Tile {
  constructor(x, y, height, type, species) {
    this.id = `${x};${y}`;
    this.x = x;
    this.y = y;
    this.height = height;
    this.type = type;
    this.species = species;
    this.draw(height);
    this.ticks = 0;
  }

  setBorder(color) {
    this.tile.attr("stroke", color);
  }

  draw(height) {
    // eslint-disable-next-line no-undef
    this.tile = d3
      .select("#grid")
      .append("rect")
      .attr("id", this.id)
      .attr("width", height)
      .attr("height", height)
      .attr("x", this.x * height)
      .attr("y", this.y * height)
      //.on("click", console.log(this.type.name))
      .attr("fill", this.type.color);
  }

  grow() {
    if (!this.isGrowable()) {
      return;
    }
    if (this.ticks > 1) {
      this.setType(TILE_TYPES.GRASS);
      this.ticks = 0;
    }
    this.ticks++;
  }

  isGrowable() {
    return this.type == TILE_TYPES.DIRT;
  }

  isObstacle() {
    return this.type == TILE_TYPES.ROCK || this.type == TILE_TYPES.WATER;
  }

  neighbours(tiles) {
    const neighbours = [
      tiles.get(`${this.x - 1};${this.y}`),
      tiles.get(`${this.x + 1};${this.y}`),
      tiles.get(`${this.x};${this.y - 1}`),
      tiles.get(`${this.x};${this.y + 1}`),
    ];
    return neighbours.filter((tile) => tile != null);
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
