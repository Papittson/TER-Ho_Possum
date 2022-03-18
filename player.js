class Player {
  constructor(speciesName, reproducibility, strenght, movespeed, perception) {
    this.speciesName = speciesName;
    this.creatures = [];
    this.reproducibility = reproducibility;
    this.strenght = strenght;
    this.movespeed = movespeed;
    this.perception = perception;
  }

  addCreature(creature) {
    this.creatures.push(creature);
  }
}
