const { NEEDS, TILE_TYPES } = require("../utils/constants.js");
const findPath = require("../utils/shortestPathAlgo.js");
const D3 = require("../utils/d3.js");
const { v4: uuidv4 } = require("uuid");

class Creature {
  /**
   * Represents a player's creature.
   * @constructor
   * @param {number} x - Position X of the creature.
   * @param {number} y - Position Y of the creature.
   * @param {Player} player - Owner of the creature.
   */
  constructor(
    x,
    y,
    { id, species, reproducibility, strength, movespeed, perception, hole }
  ) {
    this.isDead = false;
    this.reproducibility = reproducibility;
    this.strength = strength;
    this.movespeed = movespeed + 2;
    this.species = species;
    this.playerId = id;
    this.perception = perception < 3 ? perception * 2 : perception + 2;
    this.hole = hole;
    this.x = x;
    this.y = y;
    this.id = uuidv4();
    this.needs = {
      HUNGER: NEEDS.HUNGER.default,
      THIRST: NEEDS.THIRST.default,
      SLEEP: NEEDS.SLEEP.default,
      MATING: NEEDS.MATING.default - reproducibility,
    };
    this.draw();
  }

  /**
   * Draw the creature on the grid.
   */
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
      .attr("xlink:href", this.species);
  }

  /**
   * Move the creature to the specified location.
   * @param {number} x - Position X of the location.
   * @param {number} y - Position Y of the location.
   */
  move(x, y) {
    this.x = x;
    this.y = y;
    const height = this.hole.height;
    this.creature.attr("x", x * height).attr("y", y * height);
  }

  decreaseNeeds() {
    Object.keys(this.needs).forEach((need) => {
      const decreaseAmount = this.needs[need] - NEEDS[need].decreaseAmount;
      this.needs[need] = Math.max(0, decreaseAmount);
      if (need != "SLEEP" && need != "MATING" && this.needs[need] === 0) {
        this.die();
        return;
      }
    });
  }

  increaseNeed(need, tileType) {
    let increaseAmount = this.needs[need] + tileType[need];
    if (need == "MATING") {
      increaseAmount -= this.reproducibility;
    }
    this.needs[need] = Math.min(100, increaseAmount);
  }

  getCriticalNeed() {
    return Object.keys(this.needs)
      .sort((a, b) => NEEDS[b].priority - NEEDS[a].priority)
      .find((need) => this.needs[need] < NEEDS[need].critical);
  }

  doAction(tiles, creatures) {
    const criticalNeed = this.getCriticalNeed();
    let targetId;
    let targetTypes;

    switch (criticalNeed) {
      case "THIRST":
        targetTypes = [TILE_TYPES.SAND];
        break;
      case "HUNGER":
        targetTypes = [TILE_TYPES.GRASS, TILE_TYPES.FOREST];
        break;
      case "SLEEP":
        targetId = this.hole.id;
        break;
      case "MATING":
        targetId = this.hole.id;
        break;
      default:
        this.wander(tiles);
        return false;
    }

    const toExplore = new Map().set(`${this.x};${this.y}`, null);
    const path = findPath(new Map(), toExplore, tiles, targetId, targetTypes);

    if (path.length === 0) {
      this.wander(tiles);
      return false;
    }

    const targetTile = tiles.get(path[path.length - 1]);
    this.walk(path, tiles, creatures);

    // The creature arrived to its goal
    if (path.length === 0) {
      this.increaseNeed(criticalNeed, targetTile.type);
      return true;
    }

    return false;
  }

  isAlive() {
    return !this.isDead;
  }

  die() {
    this.isDead = true;
    this.creature.remove();
  }

  walk(path, tiles, creatures) {
    path.shift(); // Remove current tile from path.
    for (let step = 0; step < this.movespeed; step++) {
      const nextStep = path.shift();
      if (nextStep == null) {
        break;
      }
      const { x, y } = tiles.get(nextStep);
      const occupant = Array.from(creatures.values()).find(
        (creature) =>
          creature.playerId != this.playerId &&
          creature.x == x &&
          creature.y == y
      );
      if (occupant != null) {
        if (occupant.strength > this.strength) {
          break;
        } else {
          occupant.move(this.x, this.y);
          this.move(x, y);
        }
      } else {
        this.move(x, y);
      }
    }
  }

  /**
   * Make creature wander around.
   * @param {Array<Tile>} tiles - Tiles in the creature perception.
   */
  wander(tiles) {
    let currentTile = tiles.get(`${this.x};${this.y}`);
    for (let step = 0; step < this.movespeed; step++) {
      let neighbours = currentTile
        .neighbours(tiles)
        .filter((tile) => !tile.isObstacle());
      currentTile = neighbours[Math.floor(Math.random() * neighbours.length)];
      this.move(currentTile.x, currentTile.y);
    }
  }
}

module.exports = Creature;
