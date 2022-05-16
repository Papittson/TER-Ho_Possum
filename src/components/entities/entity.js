const { v4: uuidv4 } = require("uuid");
const D3 = require("../../utils/d3");
const _ = require("../../utils/functions.js");

class Entity {
  /**
   * Represents a generic entity.
   * @constructor
   * @param {number} x - Position X of the entity.
   * @param {number} y - Position Y of the entity.
   * @param {number} size - Size of the entity.
   */
  constructor(x, y, size) {
    this.id = uuidv4();
    this.x = x;
    this.y = y;
    this.size = size;
    this.isAlive = true;
    this.img = "";
  }

  /**
   * Render the HTML element associated with the entity.
   */
  render() {
    this.htmlElement = D3.select("#grid")
      .append("svg:image")
      .attr("id", this.id)
      .attr("width", this.size)
      .attr("height", this.size)
      .attr("x", this.x * this.size)
      .attr("y", this.y * this.size)
      .attr("class", "entity")
      .attr("xlink:href", this.img);
  }

  /**
   * Make the entity wander around.
   * @param {Tile[]} tiles - Tiles in the entity perception.
   */
  wander(tiles) {
    for (let step = 0; step < this.moveSpeed; step++) {
      const neighbours = tiles
        .get(`${this.x};${this.y}`)
        .neighbours(tiles)
        .filter((tile) => !tile.isObstacle());
      const { x, y } = _.random(neighbours);
      this.move(x, y);
    }
  }

  /**
   * Move the entity to the specified location.
   * @param {number} x - Position X of the location.
   * @param {number} y - Position Y of the location.
   */
  move(x, y) {
    this.x = x;
    this.y = y;
    this.htmlElement.attr("x", x * this.size).attr("y", y * this.size);
  }

  /**
   * Make the entity die.
   */
  die() {
    this.isAlive = false;
    this.htmlElement
      .classed("dead", true)
      .attr("xlink:href", "./images/holePos.png");
  }
}

module.exports = Entity;
