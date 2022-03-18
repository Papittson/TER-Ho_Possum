class Player {
  constructor(speciesName, reproducibility, strength, movespeed, perception) {
    this.speciesName = speciesName;
    this.creatures = [];
    this.reproducibility = reproducibility;
    this.strength = strength;
    this.movespeed = movespeed;
    this.perception = perception;
  }

  addCreature(creature) {
    this.creatures.push(creature);
  }
}
