const { NEEDS, TILE_TYPES } = require("../../utils/constants.js");
const { HUNGER, THIRST, SLEEP, MATING } = NEEDS;
const Entity = require("./entity.js");
const _ = require("../../utils/functions.js");
const findPath = require("../../utils/shortestPathAlgo.js");
const Logger = require("../../utils/logger");

class Creature extends Entity {
  static hasReproduced = false;
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
    this.player = player;
    this.playerId = id;
    this.reproducibility = reproducibility;
    this.reproductionPercentage = reproducibility / 10;
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

  static resetReproduction() {
    Creature.hasReproduced = false;
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
        this.die(need);
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
    if (need != "MATING") {
      this.needs[need] = Math.min(100, increaseAmount);
      const needStr = need.toLowerCase();
      Logger.info(`🆙 [${this.id}] augmente son besoin "${needStr}".`);
      return;
    }

    if (need == "MATING" && !Creature.hasReproduced) {
      const player = this.player;
      const creatures = this.player.getCreatures();
      const mates = creatures.filter(
        (mate) => mate.getCriticalNeed() == "MATING"
      );
      const mate = mates.find(
        (entity) =>
          entity.id != this.id && entity.x === this.x && entity.y === this.y
      );
      if (mate != null) {
        const nbNewborn = Math.ceil(player.reproducibility / 2);
        let creaturesCreated = 0;
        for (let i = 0; i < nbNewborn; i++) {
          if (Math.random() < this.reproductionPercentage) {
            player.addCreature();
            creaturesCreated++;
          }
        }
        if (creaturesCreated > 0) {
          Creature.hasReproduced = true;
          increaseAmount -= this.reproducibility;
          this.needs[need] = Math.min(100, increaseAmount);
          mate.needs[need] = Math.min(100, increaseAmount);
          Logger.info(`💕 [${this.id}] s'est reproduit.`);
        }
      }
    }
  }

  /**
   * Get the priority critical need of the creature.
   * @returns {string}
   */
  getCriticalNeed() {
    const criticalNeed = Object.keys(this.needs)
      .sort((a, b) => NEEDS[b].priority - NEEDS[a].priority)
      .find((need) => this.needs[need] < NEEDS[need].critical);
    return criticalNeed;
  }

  /**
   * Do the creature action for the game turn.
   * @param {Tile[]} tiles - Tiles in the creature's perception.
   * @param {Creature[]} creatures - Creatures in the creature's perception.
   * @returns {boolean} True if the action is done (need satisfied).
   */
  doAction(tiles, creatures) {
    const criticalNeed = this.getCriticalNeed();
    if (criticalNeed != null) {
      const needStr = criticalNeed.toLowerCase();
      Logger.info(`💫 [${this.id}] a un besoin de "${needStr}".`);
    }
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
