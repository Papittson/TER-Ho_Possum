class Creature {
  constructor(x, y, reproducibility, strenght, movespeed, perception) {
    this.positionX = x;
    this.positiony = y;
    this.reproducibility = reproducibility;
    this.strenght = strenght;
    this.movespeed = movespeed;
    this.perception = perception;
    this.needs = { hunger: 50, thirst: 50, energy: 50 };//faire une enumération à la place (voir needs.js) et mettre les contraintes
  }

  
   //deplacement d'abord sur les x puis les y (sans obstacle) 
  static move(x, y, tileType) {
    //pour l'instant la créature se téléporte à l'endroit voulu
    this.positionX = x;
    this.positionY = y;

    /* Voir algorithme plus court chemin, avec obstacle 

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
    }*/
  }

  //on a besoin des données de la case pour implémenter
  static satisfyNeeds(tileType) {
    if(tileType == water){
      needs.thirst == 1.75*needs.thirst;
    }
    else if(tileType == grass){
      needs.hunger == 1.35*needs.hunger;
    }
    else if (tileType == forest){
      needs.hunger == 1.05*needs.hunger;
    }
    else if (tileType == hole){
      needs.energy == 100;
    }
  }
  //scan de l'environnement autour de la créature dans un rayon/rectangle dont la taille dépend de la valeur de perception
  static environmentAnalysis(){}
}
