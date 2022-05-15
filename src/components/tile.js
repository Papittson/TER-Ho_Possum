const { TILE_TYPES, HOLES_IMG } = require("../utils/constants.js");
const D3 = require("../utils/d3.js");

class Tile {
  constructor(x, y, height, type) {
    this.id = `${x};${y}`;
    this.x = x;
    this.y = y;
    this.height = height;
    this.type = type;
    this.draw(height);
  }

  draw(height) {
    this.tile = D3.select("#grid")
      //.append("rect")
      .append("svg:image")
      .attr("id", this.id)
      .attr("width", height)
      .attr("height", height)
      .attr("x", this.x * height)
      .attr("y", this.y * height)
      .attr(
        "xlink:href",
        this.type.images[Math.floor(Math.random() * this.type.images.length)]
      );
    //.on("click", console.log(this.type.name))
    //.attr("fill", this.type.color);
  }

  grow() {
    if (this.isGrowable() && Math.random() <= 0.05) {
      this.setType(TILE_TYPES.GRASS);
    }
  }

  degrow() {
    if (this.type == TILE_TYPES.GRASS) {
      this.setType(TILE_TYPES.DIRT);
    }
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
    this.tile.attr(
      "xlink:href",
      this.type.images[Math.floor(Math.random() * this.type.images.length)]
    );
  }

  toHole(color) {
    this.setType(TILE_TYPES.HOLE);

    this.tile.attr("xlink:href", HOLES_IMG[color]);
  }
}

module.exports = Tile;
