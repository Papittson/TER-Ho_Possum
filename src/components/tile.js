const { TILE_TYPES } = require("../utils/constants.js");
const { DIRT, WATER, GRASS, ROCK } = TILE_TYPES;
const D3 = require("../utils/d3");
const _ = require("../utils/functions.js");

class Tile {
  /**
   * Represents a tile.
   * @constructor
   * @param {number} x - Position X of the tile.
   * @param {number} y - Position Y of the tile.
   * @param {number} size - Size of the tile.
   * @param {TILE_TYPES} type - Type of the tile.
   */
  constructor(x, y, size, type) {
    this.id = `${x};${y}`;
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = type;
    this.render(size);
  }

  /**
   * Render the HTML element associated with the grid.
   */
  render() {
    this.htmlElement = D3.select("#grid")
      .append("svg:image")
      .attr("id", this.id)
      .attr("width", this.size)
      .attr("height", this.size)
      .attr("x", this.x * this.size)
      .attr("y", this.y * this.size)
      .attr("xlink:href", _.random(this.type.images));
  }

  /**
   * Make the tile grow (if dirt).
   */
  grow() {
    if (this.type == DIRT && Math.random() <= 0.05) {
      this.setType(GRASS);
    }
  }

  /**
   * Make the tile degrow (if grass).
   */
  degrow() {
    if (this.type == GRASS) {
      this.setType(DIRT);
    }
  }

  /**
   * Check if the tile in an obstacle (rock or water).
   * @returns {boolean} True if the is an obstacle, false otherwise.
   */
  isObstacle() {
    return this.type == ROCK || this.type == WATER;
  }

  /**
   * Get tile neighbours tiles
   * @param {Tile[]} tiles - Grid tiles.
   * @returns {Tile[]} The neighbours of the tile.
   */
  neighbours(tiles) {
    const neighbours = [
      tiles.get(`${this.x - 1};${this.y}`),
      tiles.get(`${this.x + 1};${this.y}`),
      tiles.get(`${this.x};${this.y - 1}`),
      tiles.get(`${this.x};${this.y + 1}`),
    ];
    return neighbours.filter((tile) => tile != null);
  }

  /**
   * Change tile's type
   * @param {TILE_TYPES} type - Type of the tile to set.
   * @param {string} [img] - Image url for hole type only (optional).
   */
  setType(type, img) {
    this.type = type;
    img = img ? img.replace("CREATURE", "HOLE") : _.random(this.type.images);
    this.htmlElement.attr("xlink:href", img);
  }
}

module.exports = Tile;
