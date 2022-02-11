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
  //pour l'instant la créature se téléporte à l'endroit voulu
  static move([x, y]) {
    this.positionX = x;
    this.positionY = y;
  }
  //on a besoin des données de la case pour implémenter la fonction 
  static satisfyNeeds() {}
}
