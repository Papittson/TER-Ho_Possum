const { TILE_TYPES } = require("../utils/constants.js");
const Tile = require("./tile.js");

class Grid {
  constructor(players, tileHeight = 20) {
    this.players = players;
    this.height = players.length < 3 ? 700 : 800;
    this.tileHeight = tileHeight;
    this.tilesPerSide = Math.trunc(this.height / tileHeight);
    this.nbOfTiles = Math.pow(this.tilesPerSide, 2);
    this.tiles = new Map();
    this.draw();
    this.createTiles();
  }

  getTilesInArea(posX, posY, radius) {
    const minX = Math.max(posX - radius, 0);
    const maxX = Math.min(posX + radius, this.tilesPerSide - 1);
    const minY = Math.max(posY - radius, 0);
    const maxY = Math.min(posY + radius, this.tilesPerSide - 1);
    const tiles = new Map();
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        if (!this.tiles.has(`${x};${y}`)) {
          throw Error(`The tile ${x};${y} doesn't exist!`);
        }
        tiles.set(`${x};${y}`, this.tiles.get(`${x};${y}`));
      }
    }
    return tiles;
  }

  grow() {
    this.tiles.forEach((tile) => tile.grow());
  }

  draw() {
    // eslint-disable-next-line no-undef
    d3.select("#map")
      .append("svg")
      .attr("width", this.height)
      .attr("height", this.height)
      .attr("id", "grid");
  }

  createTiles() {
    this.createDirtTiles();
    this.createTilesByType(TILE_TYPES.WATER);
    this.createTilesByType(TILE_TYPES.GRASS);
    this.createTilesByType(TILE_TYPES.FOREST);
    this.createTilesByType(TILE_TYPES.ROCK);
    this.createHoles();
  }

  createDirtTiles() {
    for (let x = 0; x < this.tilesPerSide; x++) {
      for (let y = 0; y < this.tilesPerSide; y++) {
        this.tiles.set(
          `${x};${y}`,
          new Tile(x, y, this.tileHeight, TILE_TYPES.DIRT)
        );
      }
    }
  }

  createTilesByType(type) {
    const nbOfTilesToCreate = this.getNumberOfTiles(type);
    const tiles = Array.from(this.tiles.values());
    let cpt = 0;
    while (cpt < nbOfTilesToCreate) {
      const tile = tiles[Math.floor(Math.random() * tiles.length)];
      if (tile.type == TILE_TYPES.DIRT) {
        cpt++;
        tile.setType(type);
        if (type == TILE_TYPES.WATER) {
          tile
            .neighbours(this.tiles)
            .filter((tile) => tile?.type != TILE_TYPES.WATER)
            .forEach((tile) => tile?.setType(TILE_TYPES.SAND));
          const remainingWaterSize = nbOfTilesToCreate - cpt;
          const waterTiles = this.getWaterShape(tile, remainingWaterSize);
          waterTiles.forEach((tile) => tile?.setType(type));
          cpt += waterTiles.length;
          waterTiles.forEach((tile) =>
            tile
              ?.neighbours(this.tiles)
              .filter((tile) => tile?.type != TILE_TYPES.WATER)
              .forEach((tile) => tile?.setType(TILE_TYPES.SAND))
          );
        }
      }
    }
  }

  getNumberOfTiles(type) {
    return Math.trunc(type.freq * this.nbOfTiles);
  }

  createHoles() {
    const holes = [];
    const quarter = Math.trunc(this.tilesPerSide / 4);
    const threeQuarter = Math.trunc((3 * this.tilesPerSide) / 4);
    switch (this.players.length) {
      case 1:
        {
          const middle = Math.trunc(this.tilesPerSide / 2);
          const tile = this.tiles.get(`${middle};${middle}`);
          holes.push(tile);
          this.players[0].setHole(tile);
        }
        break;
      case 2:
        {
          const tile1 = this.tiles.get(`${quarter};${quarter}`);
          const tile2 = this.tiles.get(`${threeQuarter};${threeQuarter}`);
          holes.push(tile1);
          holes.push(tile2);
          this.players[0].setHole(tile1);
          this.players[1].setHole(tile2);
        }
        break;
      case 3:
        {
          const tile1 = this.tiles.get(`${quarter};${quarter}`);
          const tile2 = this.tiles.get(`${threeQuarter};${quarter}`);
          const tile3 = this.tiles.get(`${quarter};${threeQuarter}`);
          holes.push(tile1);
          holes.push(tile2);
          holes.push(tile3);
          this.players[0].setHole(tile1);
          this.players[1].setHole(tile2);
          this.players[2].setHole(tile3);
        }
        break;
      case 4:
        {
          const tile1 = this.tiles.get(`${quarter};${quarter}`);
          const tile2 = this.tiles.get(`${threeQuarter};${quarter}`);
          const tile3 = this.tiles.get(`${quarter};${threeQuarter}`);
          const tile4 = this.tiles.get(`${threeQuarter};${threeQuarter}`);
          holes.push(tile1);
          holes.push(tile2);
          holes.push(tile3);
          holes.push(tile4);
          this.players[0].setHole(tile1);
          this.players[1].setHole(tile2);
          this.players[2].setHole(tile3);
          this.players[3].setHole(tile4);
        }
        break;
      default:
        throw Error("You need to have 1 to 4 players!");
    }
    for (let i = 0; i < this.players.length; i++) {
      holes[i].toHole(this.players[i].species);
    }
  }

  getWaterShape(tile, remainingWaterSize) {
    const shapes = [
      [`${tile.x - 1};${tile.y}`, `${tile.x + 1};${tile.y}`], // Shape 1
      [`${tile.x};${tile.y - 1}`, `${tile.x};${tile.y + 1}`], // Shape 2
      [`${tile.x + 1};${tile.y}`, `${tile.x};${tile.y + 1}`], // Shape 3
      [`${tile.x - 1};${tile.y}`, `${tile.x};${tile.y + 1}`], // Shape 4
      [`${tile.x};${tile.y - 1}`, `${tile.x + 1};${tile.y}`], // Shape 5
      [`${tile.x - 1};${tile.y}`, `${tile.x};${tile.y - 1}`], // Shape 6
      [
        `${tile.x - 1};${tile.y}`,
        `${tile.x - 1};${tile.y + 1}`,
        `${tile.x};${tile.y + 1}`,
      ], // Shape 7
    ];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    const tiles = randomShape.map((id) => this.tiles.get(id));
    tiles.length = Math.min(remainingWaterSize, tiles.length);

    return tiles;
  }
}

module.exports = Grid;

/*
function shareItem(list1, list2) {
  for (let item of list1) {
    if (list2.includes(item)) {
      return true;
    }
  }
  return false;
}

function isInjective(list) {
  temp = [];
  i = 0;
  do {
    temp.push(list[i]);
    i++;
  } while (!temp.includes(list[i]) && i < list.length);
  return temp.length == list.length;
}
*/
