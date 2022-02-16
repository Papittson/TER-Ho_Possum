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

  //
  //pour l'instant la créature se téléporte à l'endroit voulu/ tentative de deplacement d'abord sur les x puis les y
  static move(x, y, tileType) {
    this.positionX = x;
    this.positionY = y;
    var xDistance = Math.abs(x - this.positionX);
    var yDistance = Math.abs(y - this.positionY);
    if (tileType == rock) {
      if (this.positionX < x) {
        for (let i = this.positionX; i <= xDistance; i++) {
          xDistance=Math.abs(x-i);
          if (this.positionY < y) {

          }
        }
      }
    }
  }
  //on a besoin des données de la case pour implémenter la fonction
  static satisfyNeeds() {}
  //scan de l'environnement autour de la créature dans un rayon/rectangle dont la taille dépend de la valeur de perception
  static environmentAnalysis(){}
}
