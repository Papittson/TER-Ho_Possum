// eslint-disable-next-line no-unused-vars
class Player {
  constructor(species, reproducibility, strength, movespeed, perception, shed) {
    this.species = species;
    this.creatures = [];
    this.reproducibility = reproducibility;
    this.strength = strength;
    this.movespeed = movespeed;
    this.perception = perception;
    this.shed = shed;
  }

  addCreature(creature) {
    this.creatures.push(creature);
  }
}
module.exports = Player;
