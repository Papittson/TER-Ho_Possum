const { PREDATOR_SETTINGS } = require("../../utils/constants.js");
const { STRENGTH, PERCEPTION, MOVE_SPEED, IMG } = PREDATOR_SETTINGS;
const Entity = require("./entity.js");
const findPath = require("../../utils/shortestPathAlgo.js");
const _ = require("../../utils/functions.js");
const Logger = require("../../utils/logger");

class Predator extends Entity {
  /**
   * Represents a predator.
   * @constructor
   * @param {number} x - Position X of the predator.
   * @param {number} y - Position Y of the predator.
   * @param {number} size - Size of the predator.
   */
  constructor(x, y, size) {
    super(x, y, size);
    this.strength = STRENGTH;
    this.moveSpeed = MOVE_SPEED;
    this.perception = PERCEPTION;
    this.img = IMG;
    this.render();
  }

  /**
   * Do the predator action for the game turn.
   * @param {Tile[]} tiles - Tiles in the predator's perception.
   * @param {Creature[]} creatures - Creatures in the predator's perception.
   * @returns {boolean} True if the action is done (creature eaten).
   */
  doAction(tiles, creatures) {
    const crowdStrength = creatures.reduce(
      (sum, creature) => sum + creature.strength,
      0
    );

    if (crowdStrength > this.strength) {
      this.wander(tiles);
      return false;
    }

    const path = findPath(this, "creature", tiles, creatures);

    if (path.length === 0) {
      this.wander(tiles);
      return false;
    }

    this.walk(path, tiles, creatures);

    // The predator arrived to its goal
    if (path.length === 0) {
      this.eat(creatures);
      return true;
    }

    return false;
  }

  /**
   * Make the predator walk along the path.
   * @param {string[]} path - Array of tile ids.
   * @param {Tile[]} tiles - Tiles in the predator's perception.
   */
  walk(path, tiles) {
    path.shift(); // Remove current tile from path.
    for (let step = 0; step < this.moveSpeed; step++) {
      const nextStep = path.shift();
      if (nextStep == null) {
        break;
      }
      const { x, y } = tiles.get(nextStep);
      this.move(x, y);
    }
  }

  /**
   * Make the predator eat a random creature at its position.
   * @param {Creature[]} creatures - Creatures in the predator's perception.
   */
  eat(creatures) {
    const edibleCreatures = creatures.filter(
      ({ x, y }) => this.x === x && this.y === y
    );
    const creature = _.random(edibleCreatures);
    if (creature != null) {
      Logger.info(`🩸 [${this.id}] a mangé une créature.`);
      creature.die("PREDATOR");
    }
  }
}

module.exports = Predator;
