class Player {
  constructor(species, reproducibility, strength, movespeed, perception) {
    this.species = species;
    this.creatures = [];
    this.reproducibility = reproducibility;
    this.strength = strength;
    this.movespeed = movespeed;
    this.perception = perception;
  }

  setHole(hole) {
    this.hole = hole;
    hole.setBorder(this.color);
  }

  setColor(color) {
    this.color = color;
  }

  addCreature(creature) {
    this.creatures.push(creature);
  }
}
module.exports = Player;
