// eslint-disable-next-line no-unused-vars
class Creature {
  constructor(
    x,
    y,
    {
      species,
      creatures,
      reproducibility,
      strength,
      movespeed,
      perception,
      shed,
    }
  ) {
    this.reproducibility = reproducibility;
    this.strength = strength;
    this.movespeed = movespeed;
    this.perception = perception;
    this.shed = shed;
    this.x = x;
    this.y = y;
    this.id = species + creatures.length;
    this.needsLevel = { hunger: 50, thirst: 50, energy: 50 };
    this.draw();
    // eslint-disable-next-line no-undef
  }

  draw() {
    // eslint-disable-next-line no-undef
    d3.select("#grid")
      .append("circle")
      .attr("cx", this.x * this.shed.height + this.shed.height / 2)
      .attr("cy", this.y * this.shed.height + this.shed.height / 2)
      .attr("r", this.shed.height / 2 - 3)
      .attr("fill", "#ff0015")
      .attr("class", "top")
      .attr("id", this.id);
  }

  currentTile(tiles) {
    return tiles[`${this.x};${this.y}`];
  }

  //concernant le deplacement
  goToTileByNeed(need) {
    for (let tile in this.scanArea()) {
      if (need == "thirst" && tile.tileType == "water") {
        this.move(tile.x, tile.y);
      } else if (need == "hunger" && tile.TileType == "grass") {
        this.move(tile.x, tile.y);
      }
    }
  }

  move(x, y) {
    this.x = x;
    this.y = y;
    // eslint-disable-next-line no-undef
    d3.select("#" + this.id)
      .attr("cx", x * this.shed.height + this.shed.height / 2)
      .attr("cy", y * this.shed.height + this.shed.height / 2);
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
        this.needsLevel.thirst = 1.75 * this.needsLevel.thirst;
        break;
      case "grass":
        this.needsLevel.hunger = 1.35 * this.needsLevel.hunger;
        break;
      case "forest":
        this.needsLevel.hunger = 1.05 * this.needsLevel.hunger;
        break;
      case "shed":
        this.needsLevel.energy = 100;
        break;
    }
  }

  searchTile(tileType, listTile, heightMap) {
    let i = 0;
    let environment = this.scanArea(listTile, heightMap);
    while (i < environment.length && environment[i].tileType != tileType) {
      i++;
    }
    if (i != environment.length) {
      return environment[i];
    } else {
      return null; //à voir
    }
  }

  scanArea(listTile, heightMap) {
    const radius = this.perception < 3 ? 2 : this.perception > 3 ? 6 : 4;
    const tilesSorted = [];
    let minX = Math.max(this.x - radius, 0);
    let maxX = Math.min(this.x + radius, heightMap);
    let minY = Math.max(this.y - radius, 0);
    let maxY = Math.min(this.y + radius, heightMap);
    let distanceToTile = {};
    for (let i = 0; i < listTile.length; i++) {
      if (
        listTile[i].x >= minX &&
        listTile[i].x <= maxX &&
        listTile[i].y >= minY &&
        listTile[i].y <= maxY
      ) {
        distanceToTile[i] =
          Math.abs(listTile[i].x - this.x) + Math.abs(listTile[i].y - this.y);
        listTile[i].draw.attr("fill", "red");
      }
    }

    var listKeyDistance = Object.keys(distanceToTile).map((key) => {
      return [key, distanceToTile[key]];
    });

    listKeyDistance.sort((first, second) => {
      return first[1] - second[1];
    });

    var listeTileSortedIndex = listKeyDistance.map((e) => {
      return e[0];
    });

    for (let index of listeTileSortedIndex) {
      tilesSorted.push(listTile[index]);
    }
    return tilesSorted;
  }
}
module.exports = Creature;
