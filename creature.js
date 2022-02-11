class Creature {
  constructor(x, y, reproducibility, strenght, movespeed, perception) {
    this.positionX = x;
    this.positiony = y;
    this.reproducibility = reproducibility;
    this.strenght = strenght;
    this.movespeed = movespeed;
    this.perception = perception;
    this.needs = { hunger: 100, thirst: 100, energy: 100 };
  }
  static deplacement([x, y]) {
    this.positionX = x;
    this.positionY = y;
  }
  static satisfactionBesoin() {}
}
