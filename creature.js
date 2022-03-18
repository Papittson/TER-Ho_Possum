class Creature {
  constructor(
    x,
    y,
    {
      speciesName,
      creatures,
      reproducibility,
      strenght,
      movespeed,
      perception,
    },
    heightTile
  ) {
    this.reproducibility = reproducibility;
    this.strenght = strenght;
    this.movespeed = movespeed;
    this.perception = perception;
    this.x = x;
    this.y = y;
    this.id = speciesName + creatures.size();
    this.needsLevel = { hunger: 50, thirst: 50, energy: 50 };
    d3.select("#grid")
      .append("circle")
      .attr("cx", this.x)
      .attr("cy", this.y)
      .attr("r", heightTile / 2 - 1)
      .attr("fill", "black")
      .attr("class", "top")
      .attr("id", this.id);
  }

  //concernant le deplacement
  goToTileByNeed(need) {
    for (let tile in this.environmentAnalysis()) {
      if (need == thirst && tile.tileType == water) {
        this.move(tile.x, tile.y);
      } else if (need == hunger && tile.TileType == grass) {
        this.move(tile.x, tile.y);
      }
    }
  }

  move(x, y) {
    this.x = x;
    this.y = y;
    d3.select("#" + this.id)
      .attr("cx", x)
      .attr("cy", y);
  }

  //actions sur les besoins
  increaseNeedsLevel(need, rate) {
    if (rate < 0) {
      throw new RangeError();
    }
    this.needsLevel[need] += rate;
  }

  decreaseNeedsLevel(need, rate) {
    if (rate < 0) {
      throw new RangeError();
    }
    this.needsLevel[need] -= rate;
  }
  satisfyNeeds(tileType) {
    switch (tileType) {
      case "water":
        needsLevel.thirst = 1.75 * needs.thirst;
        break;
      case "grass":
        needsLevel.hunger = 1.35 * needs.hunger;
        break;
      case "forest":
        needsLevel.hunger = 1.05 * needs.hunger;
        break;
      case "shed":
        needsLevel.energy = 100;
        break;
    }
  }
  searchTile(tileType) {
    //TODO
  }
  environmentAnalysis(listTile) {
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
