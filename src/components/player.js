const Creature = require("./creature");

class Player {
  constructor(species, reproducibility, strength, movespeed, perception) {
    this.species = species;
    this.creatures = [];
    this.deadCreatures = [];
    this.reproducibility = reproducibility;
    this.strength = strength;
    this.movespeed = movespeed;
    this.perception = perception;
    this.creatureCounter = 0;
  }

  addDeadCreature(creature) {
    this.deadCreatures.push(creature);
    this.creatures = this.creatures.filter((entity) => entity != creature);
  }

  setHole(hole) {
    this.hole = hole;
    hole.setImage(this.color);
  }

  setColor(color) {
    this.color = color;
  }

  addCreature() {
    this.creatures.push(new Creature(this.hole.x, this.hole.y, this));
    this.creatureCounter++;
  }
}
module.exports = Player;
