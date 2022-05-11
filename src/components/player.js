const { v4: uuidv4 } = require("uuid");

class Player {
  constructor(species, reproducibility, strength, movespeed, perception) {
    this.id = uuidv4();
    this.species = species;
    this.creatures = [];
    this.deadCreatures = [];
    this.reproducibility = reproducibility;
    this.strength = strength;
    this.movespeed = movespeed;
    this.perception = perception;
  }

  addDeadCreature(creature) {
    this.deadCreatures.push(creature);
    this.creatures = this.creatures.filter((entity) => entity != creature);
  }

  setHole(hole) {
    this.hole = hole;
    hole.toHole(this.color);
  }

  setColor(color) {
    this.color = color;
  }

  addCreature(creature) {
    this.creatures.push(creature);
  }
}
module.exports = Player;
