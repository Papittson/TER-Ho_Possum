const { NEEDS, TILE_TYPES } = require("../utils/constants.js");
const findPath = require("../utils/shortestPathAlgo.js");
const D3 = require("../utils/d3.js");
const Logger = require("../utils/logger.js");

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
    {
      species,
      creatureCounter,
      reproducibility,
      strength,
      movespeed,
      perception,
      hole,
      color,
    }
  ) {
    this.isDead = false;
    this.reproducibility = reproducibility;
    this.strength = strength;
    this.movespeed = movespeed;
    this.species = species;
    this.perception = perception;
    this.hole = hole;
    this.x = x;
    this.y = y;
    this.color = color;
    this.id = `${species}-${creatureCounter}`;
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
      .attr("xlink:href", "./images/CREATURE.png");
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
    Logger.log(
      this.species,
      `Mon/ma ${need} = ${this.needs[need]}.`,
      this.color
    );
  }

  getCriticalNeed() {
    return Object.keys(this.needs)
      .sort((a, b) => NEEDS[b].priority - NEEDS[a].priority)
      .find((need) => this.needs[need] < NEEDS[need].critical);
  }

  doAction(tiles) {
    const criticalNeed = this.getCriticalNeed();
    let targetId;
    let targetTypes;

    Logger.log(
      this.species,
      `Position de ${this.id} : ${this.x};${this.y}.`,
      this.color
    );
    Logger.log(this.species, JSON.stringify(this.needs, null, 4), this.color);

    switch (criticalNeed) {
      case "THIRST":
        Logger.log(this.species, `J'ai soif.`, this.color);
        targetTypes = [TILE_TYPES.SAND];
        break;
      case "HUNGER":
        Logger.log(this.species, `J'ai faim.`, this.color);
        targetTypes = [TILE_TYPES.GRASS, TILE_TYPES.FOREST];
        break;
      case "SLEEP":
        Logger.log(this.species, `J'ai sommeil.`, this.color);
        targetId = this.hole.id;
        break;
      case "MATING":
        Logger.log(this.species, `J'aimerais agrandir ma famille.`, this.color);
        targetId = this.hole.id;
        break;
      default:
        Logger.log(this.species, `J'erre.`, this.color);
        this.wander(tiles);
        return false;
    }

    const toExplore = new Map().set(`${this.x};${this.y}`, null);
    const path = findPath(new Map(), toExplore, tiles, targetId, targetTypes);

    if (path.length === 0) {
      Logger.log(this.species, `Pas de chemin trouvé, j'erre.`, this.color);
      this.wander(tiles);
      return false;
    }

    const targetTile = tiles.get(path[path.length - 1]);
    Logger.log(this.species, `Go tuile ${targetTile.id}.`, this.color);
    this.walk(path, tiles);

    // The creature arrived to its goal
    if (path.length === 0) {
      Logger.log(this.species, `Arrivée à destination ! :3`, this.color);
      this.increaseNeed(criticalNeed, targetTile.type);
      return true;
    }

    Logger.log(this.species, `Ouf, encore du chemin à faire...`, this.color);

    return false;
  }

  isAlive() {
    return !this.isDead;
  }

  die() {
    Logger.log(
      "CREATURE",
      `Je ne me sens pas très bien Mr. STARK 💨`,
      this.color
    );
    this.isDead = true;
    this.creature.remove();
  }

  walk(path, tiles) {
    path.shift(); // Remove current tile from path.
    for (let step = 0; step < this.movespeed; step++) {
      const nextStep = path.shift();
      if (nextStep == null) {
        break;
      }
      const { x, y } = tiles.get(nextStep);
      this.move(x, y);
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
