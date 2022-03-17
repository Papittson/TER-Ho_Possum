class Creature {
  constructor(id,x, y, reproducibility, strenght, movespeed, perception,heightTile) {
    this.reproducibility = reproducibility;
    this.strenght = strenght;
    this.movespeed = movespeed;
    this.perception=perception;
    this.x = x;
    this.y = y;
    this.id = id;
    this.needsLevel = { hunger: 50, thirst: 50, energy: 50 };
    d3.select("#grid").append("circle").attr("cx",this.x).attr("cy",this.y).attr("r",heightTile/2-1).attr("fill","black").attr("class","top").attr("id",this.id);
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

  //à revoir (lier avec le svg)
  move(x, y) {
    this.setX(x);
    this.setY(y);
    d3.select("#"+this.id).attr("cx",x).attr("cy",y);
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

  //pour la reproduction de la créature
  static reproduce(creature, creature, tileType){
    const babies = this.reproducibility < 3 ? 2 : this.reproducibility > 3 ? 6 : 4;
    if (tileType == hole && (creature.needsLevel.thirst>35) && (creature.needsLevel.hunger>30) && (creature.needsLevel.sleep>20)) 
    //ajout d'une nouvelle ou de plusieurs nouvelles créatures 
    Map.addCreature(new Creature(x, y, reproducibility, strenght, movespeed, perception,heightTile));
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
