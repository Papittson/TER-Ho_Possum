class Creature extends Species {
  constructor(x, y, reproducibility, strenght, movespeed, perception) {
    super(reproducibility, strenght, movespeed, perception);
    this.x = x;
    this.y = y;
    this.needsLevel = { hunger: 50, thirst: 50, energy: 50 };
  }
//accesseurs
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  setX(x) {
    this.x = x;
  }
  setY(y) {
    this.y = y;
  }

  
//concernant le deplacement
  goToTileByNeed(need) {
    for (let tile in this.environmentAnalysis()) {
      if(need==thirst && tile.tileType==water){
        this.move(tile.x,tile.y);
      }else if(need==hunger && tile.TileType==grass){
        this.move(tile.x,tile.y);
      }
    }
  }

  move(x, y) {
    const moveOnAxis = (start, end) => {
      const step = this.movespeed < 3 ? 1 : this.movespeed > 3 ? 3 : 2;
      const direction = start < end ? 1 : -1;

      while (start != end) {
        start += direction * Math.min(Math.abs(start - end), step);
      }
      return start;
    };

    this.setX(moveOnAxis(this.x, x));
    this.setY(moveOnAxis(this.y, y));
  }


//actions sur les besoins
  increaseNeedsLevel(need, rate) {
    if (rate < 0) {
      throw RangeError;
    }
    this.needsLevel[need] += rate;
  }

  decreaseNeedsLevel(need, rate) {
    if (rate < 0) {
      throw RangeError;
    }
    this.needsLevel[need] -= rate;
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
  static environmentAnalysis(listTile) {
    const radius = this.perception < 3 ? 2 : this.perception > 3 ? 6 : 4;
    const tileOk = [];
    for (
      let x = min(0, this.x - radius);
      x <= min(heightMap, x + radius);
      x++
    ) {
      for (
        let y = min(0, this.y - radius);
        x <= min(heightMap, y + radius);
        y++
      ) {
        for (let tile in listTile) {
          if (tile.x == x && tile.y == y) {
            tileOk.push(tile);
          }
        }
      }
    }
    return tileOk;
  }
}
