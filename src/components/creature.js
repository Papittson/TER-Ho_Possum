const { NEEDS, TILE_TYPES } = require("../utils/constants.js");
const findPath = require("../utils/shortestPathAlgo.js");

class Creature {
  constructor(
    x,
    y,
    {
      species,
      creatures,
      reproducibility,
      strength,
      movespeed,
      perception,
      hole,
      color,
    }
  ) {
    this.reproducibility = reproducibility;
    this.strength = strength;
    this.movespeed = movespeed;
    this.perception = perception;
    this.hole = hole;
    this.x = x;
    this.y = y;
    this.color = color;
    this.id = species + creatures.length;
    this.needs = {
      HUNGER: NEEDS.HUNGER.default,
      THIRST: NEEDS.THIRST.default,
      SLEEP: NEEDS.SLEEP.default,
    };
    this.draw();
  }

  draw() {
    // eslint-disable-next-line no-undef
    d3.select("#grid")
      .append("circle")
      .attr("cx", this.x * this.hole.height + this.hole.height / 2)
      .attr("cy", this.y * this.hole.height + this.hole.height / 2)
      .attr("r", this.hole.height / 2 - 3)
      .attr("fill", this.color)
      .attr("class", "top")
      .attr("id", this.id);
  }

  move(x, y) {
    this.x = x;
    this.y = y;
    // eslint-disable-next-line no-undef
    d3.select(`#${this.id}`)
      .attr("cx", x * this.hole.height + this.hole.height / 2)
      .attr("cy", y * this.hole.height + this.hole.height / 2);
  }

  decreaseNeeds() {
    for (const need of Object.keys(this.needs)) {
      const decreaseAmount = this.needs[need] - NEEDS[need].decreaseAmount;
      this.needs[need] = Math.max(0, decreaseAmount);
    }
  }

  increaseNeed(need) {
    if (need != null) {
      const increaseAmount = this.needs[need] + NEEDS[need].increaseAmount;
      this.needs[need] = Math.min(100, increaseAmount);
    }
  }

  getCriticalNeed() {
    const sortedNeeds = Object.keys(this.needs);
    sortedNeeds.sort((a, b) => NEEDS[a].priority - NEEDS[b].priority);
    for (const need of sortedNeeds) {
      if (this.needs[need] < NEEDS[need].critical) {
        return need;
      }
    }
    return null;
  }

  doAction(tilesInArea) {
    const criticalNeed = this.getCriticalNeed();
    let targetType;
    switch (criticalNeed) {
      case "THIRST":
        targetType = TILE_TYPES.WATER;
        break;
    }
    const tilesToExplore = new Map();
    tilesToExplore.set(`${this.x};${this.y}`, null);
    const path = findPath(
      new Map(),
      tilesToExplore,
      tilesInArea,
      undefined,
      targetType
    );
    if (path.length === 0) {
      // TODO Direction au hasard
      const currentTile = tilesInArea.get(`${this.x};${this.y}`);
      for (let step = 0; step < this.movespeed; step++) {
        let neighbours;
        // TODO Continuer ici
      }
      return true;
    } else {
      // Prevent creature from stepping into water (no drowning)
      if (criticalNeed == "THIRST") {
        path.pop();
      }
      for (let step = 0; step < this.movespeed; step++) {
        // TODO Utiliser setTimeout avec await
        const nextStep = path.shift();
        if (nextStep == null) {
          break;
        }
        const { x, y } = tilesInArea.get(nextStep);
        this.move(x, y);
      }
      // The creature arrived to its goal
      if (path.length === 0) {
        this.increaseNeed(criticalNeed);
        return true;
      }
    }

    return false;
  }
}

module.exports = Creature;
