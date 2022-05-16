const { NEEDS, TILE_TYPES } = require("../../utils/constants.js");
const { HUNGER, THIRST, SLEEP, MATING } = NEEDS;
const Entity = require("./entity.js");
const _ = require("../../utils/functions.js");
const findPath = require("../../utils/shortestPathAlgo.js");

class Creature extends Entity {
  /**
   * Represents a player's creature.
   * @constructor
   * @param {number} x - Position X of the creature.
   * @param {number} y - Position Y of the creature.
   * @param {Player} player - Owner of the creature.
   */
  constructor(x, y, player) {
    const { id, img, reproducibility, strength, moveSpeed, perception, hole } =
      player;
    super(x, y, hole.size);
    this.playerId = id;
    this.reproducibility = reproducibility;
    this.strength = strength;
    this.moveSpeed = moveSpeed;
    this.perception = perception;
    this.hole = hole;
    this.needs = {
      HUNGER: HUNGER.default,
      THIRST: THIRST.default,
      SLEEP: SLEEP.default,
      MATING: MATING.default - reproducibility,
    };
    this.img = img;
    this.render();
  }

  /**
   * Decrease all creature's needs.
   */
  decreaseNeeds() {
    const needs = Object.keys(this.needs);
    needs.forEach((need) => {
      const decreaseAmount = this.needs[need] - NEEDS[need].decreaseAmount;
      this.needs[need] = Math.max(0, decreaseAmount);
      if (need != "SLEEP" && need != "MATING" && this.needs[need] === 0) {
        this.die();
        return;
      }
    });
  }

  /**
   * Increase a creature's need according to current tile type.
   * @param {string} need - String representation of the need.
   * @param {TILE_TYPES} tileType - Tile type that fulfill creature's need.
   */
  increaseNeed(need, tileType) {
    let increaseAmount = this.needs[need] + tileType[need];
    if (need == "MATING") {
      increaseAmount -= this.reproducibility;
    }
    this.needs[need] = Math.min(100, increaseAmount);
  }

  /**
   * Get the priority critical need of the creature.
   * @returns {string}
   */
  getCriticalNeed() {
    return Object.keys(this.needs)
      .sort((a, b) => NEEDS[b].priority - NEEDS[a].priority)
      .find((need) => this.needs[need] < NEEDS[need].critical);
  }

  /**
   * Do the creature action for the game turn.
   * @param {Tile[]} tiles - Tiles in the creature's perception.
   * @param {Creature[]} creatures - Creatures in the creature's perception.
   * @returns {boolean} True if the action is done (need satisfied).
   */
  doAction(tiles, creatures) {
    const criticalNeed = this.getCriticalNeed();
    let goal;

    switch (criticalNeed) {
      case "THIRST":
        goal = [TILE_TYPES.SAND];
        break;
      case "HUNGER":
        goal = [TILE_TYPES.GRASS, TILE_TYPES.FOREST];
        break;
      case "SLEEP":
      case "MATING":
        goal = this.hole.id;
        break;
      default:
        this.wander(tiles);
        return false;
    }

    const path = findPath(this, goal, tiles);

    if (path.length === 0) {
      this.wander(tiles);
      return false;
    }

    const targetTile = tiles.get(_.last(path));
    this.walk(path, tiles, creatures);

    // The creature arrived to its goal
    if (path.length === 0) {
      this.increaseNeed(criticalNeed, targetTile.type);
      return true;
    }

    return false;
  }

  /**
   * Make the creature walk along the path.
   * @param {string[]} path - Array of tile ids.
   * @param {Tile[]} tiles - Tiles in the creature's perception.
   * @param {Creature[]} creatures - Creatures in the creature's perception.
   */
  walk(path, tiles, creatures) {
    path.shift(); // Remove current tile from path.
    for (let step = 0; step < this.moveSpeed; step++) {
      const nextStep = path.shift();
      if (nextStep == null) {
        break;
      }
      const { x, y } = tiles.get(nextStep);
      const occupant = creatures.find(
        (creature) =>
          creature.playerId != this.playerId &&
          creature.x == x &&
          creature.y == y
      );

      if (this.fight(occupant)) {
        occupant?.move(this.x, this.y);
        this.move(x, y);
      } else {
        break;
      }
    }
  }

  /**
   * Make the creature fight another creature.
   * @param {Creature} creature - The creature to fight against.
   * @returns {boolean} True if the creature won the fight, false otherwise.
   */
  fight(creature) {
    return creature == null || creature.strength <= this.strength;
  }
}

module.exports = Creature;
