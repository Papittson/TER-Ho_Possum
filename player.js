class Player {
  constructor(
    speciesName,
    reproducibilityInput,
    strenghtInput,
    movespeedInput,
    perceptionInput
  ) {
    this.speciesName =speciesName;
    this.creatures = [];
    this.reproducibilityInput = reproducibilityInput;
    this.strenghtInput = strenghtInput;
    this.movespeedInput = movespeedInput;
    this.perceptionInput = perceptionInput;
  }

  getSpeciesName(){
      return this.speciesName;
  }

  getReproductibilityInput(){
      return this.reproducibilityInput;
  }
  getStrengthInput(){
      return this.strenghtInput;
  }
  getMovespeedInput(){
      return this.movespeedInput;
  }
  getPerceptionInput(){
      return this.perceptionInput;
  }



  getCreatures() {
    return this.creatures;
  }
  addCreature(creature) {
    this.getCreatures().push(creature);
  }
}
