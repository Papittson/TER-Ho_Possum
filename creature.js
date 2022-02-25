class Creature {
  constructor(x, y, reproducibility, strenght, movespeed, perception) {
    this.x = x;
    this.y = y;
    this.reproducibility = reproducibility;
    this.strenght = strenght;
    this.movespeed = movespeed;
    this.perception = perception;
    this.needsLevel = { hunger: 50, thirst: 50, energy: 50 }; 
  }

  
  move(x, y) {

    const moveOnAxis = (start, end) => {
      const step = (this.movespeed < 3) ? 1 : (this.movespeed > 3) ? 3 : 2 ;
      const direction = (start < end) ? 1 : -1;
  
      while(start != end){
          start += direction * min(Math.abs(start - end), step); 
      }
    }
    
    moveOnAxis(this.x, x);
    moveOnAxis(this.y, y);

  }

  
  static satisfyNeeds(tileType) {
    if (tileType == water) {
      needsLevel.thirst == 1.75 * needs.thirst;
    } else if (tileType == grass) {
      needsLevel.hunger == 1.35 * needs.hunger;
    } else if (tileType == forest) {
      needsLevel.hunger == 1.05 * needs.hunger;
    } else if (tileType == hole) {
      needsLevel.energy == 100;
    }
  }
  //scan de l'environnement autour de la créature dans un rayon/rectangle dont la taille dépend de la valeur de perception
  static environmentAnalysis() {}
}
