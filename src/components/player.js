const { v4: uuidv4 } = require("uuid");
const { TILE_TYPES } = require("../utils/constants.js");
const Creature = require("./entities/creature.js");

class Player {
  /**
   * Represents a player.
   * @constructor
   * @param {string} img - URL to the player's species image.
   * @param {Object} attributes - Attribute levels selected by the player.
   */
  constructor(attributes) {
    const { img, reproduction, strength, mobility, perception } = attributes;
    this.id = uuidv4();
    this.img = img;
    this.creatures = [];
    this.reproducibility = reproduction;
    this.strength = strength;
    this.moveSpeed = mobility + 2;
    this.perception = perception < 3 ? perception * 2 : perception + 2;
  }

  /**
   * Assign a hole to the player.
   * @param {Tile} tile - The tile to set as player's hole.
   */
  setHole(tile) {
    this.hole = tile;
    tile.setType(TILE_TYPES.HOLE, this.img);
  }

  /**
   * Add a new creature to player's creatures.
   */
  addCreature() {
    const { x, y } = this.hole;
    const creature = new Creature(x, y, this);
    this.creatures.push(creature);
    return creature;
  }

  /**
   * Get player's alive creatures.
   * @returns {Creature[]}
   */
  getCreatures() {
    return this.creatures.filter((creature) => creature.isAlive);
  }
}

module.exports = Player;
