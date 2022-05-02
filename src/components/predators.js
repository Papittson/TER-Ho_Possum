const D3 = require("../utils/d3.js");
const NEEDS = require("../utils/constants.js");
class Predator {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.strength = 4;
    this.moveSpeed = 3;
    this.perception = 3;
    this.draw();
    this.needs = { HUNGER: NEEDS.HUNGER.default, THIRST: NEEDS.THIRST.default };
  }

  draw() {
    const height = this.hole.height;
    this.creature = D3.select("#grid")
      .append("svg:image")
      .attr("width", height)
      .attr("height", height)
      .attr("x", this.x * height)
      .attr("y", this.y * height)
      .attr("class", "top")
      .attr("id", this.id)
      .attr("xlink:href", "./images/PREDATOR01.png");
  }
}

module.exports = Predator;
