const D3 = require("../utils/d3");
const { TILE_TYPES } = require("../utils/constants.js");
const { SAND, ROCK, WATER, DIRT, GRASS, FOREST, HOLE } = TILE_TYPES;
const Tile = require("./tile.js");
const _ = require("../utils/functions.js");

class Grid {
  /**
   * Represents a grid.
   * @constructor
   * @param {Player[]} players - Array of players.
   * @param {number} tileSize - Tile size.
   */
  constructor(players, tileSize) {
    this.players = players;
    this.size = players.length < 3 ? 500 : 700;
    this.tileSize = tileSize;
    this.tilesPerSide = Math.trunc(this.size / tileSize);
    this.nbOfTiles = Math.pow(this.tilesPerSide, 2);
    this.tiles = new Map();
    this.render();
    this.createTiles();
  }

  /**
   * Render the HTML element associated with the grid.
   */
  render() {
    D3.select("#map")
      .append("svg")
      .attr("width", this.size)
      .attr("height", this.size)
      .attr("id", "grid");
  }

  /**
   * Get area of tiles around a center position.
   * @param {number} posX - Position X of the location.
   * @param {number} posY - Position Y of the location.
   * @param {number} radius - Radius of the area.
   */
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

  /**
   * Get area of creatures around a center position.
   * @param {number} posX - Position X of the location.
   * @param {number} posY - Position Y of the location.
   * @param {number} radius - Radius of the area.
   */
  getCreaturesInArea(creatures, posX, posY, radius) {
    const minX = Math.max(posX - radius, 0);
    const maxX = Math.min(posX + radius, this.tilesPerSide - 1);
    const minY = Math.max(posY - radius, 0);
    const maxY = Math.min(posY + radius, this.tilesPerSide - 1);
    let creaturesInArea = [];
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        const creaturesAtPosition = creatures.filter(
          (creature) => creature.x === x && creature.y === y
        );
        creaturesInArea = creaturesInArea.concat(creaturesAtPosition);
      }
    }
    return creaturesInArea;
  }

  /**
   * Grow all tiles (growable tiles only).
   */
  grow() {
    this.tiles.forEach((tile) => tile.grow());
  }

  /**
   * Degrow a tile at specific position, if growable.
   * @param {number} x - Position X of the location.
   * @param {number} y - Position Y of the location.
   */
  degrow(x, y) {
    this.tiles.get(`${x};${y}`).degrow();
  }

  /**
   * Generate and render tiles on the grid.
   */
  createTiles() {
    this.createDirtTiles();
    this.createHoles();
    this.createTilesByType(WATER);
    this.createTilesByType(SAND);
    this.createTilesByType(GRASS);
    this.createTilesByType(FOREST);
    this.createTilesByType(ROCK);
    this.predatorSpawn.setType(GRASS);
  }

  /**
   * Generate and render dirt tiles on the grid.
   */
  createDirtTiles() {
    for (let x = 0; x < this.tilesPerSide; x++) {
      for (let y = 0; y < this.tilesPerSide; y++) {
        this.tiles.set(`${x};${y}`, new Tile(x, y, this.tileSize, DIRT));
      }
    }
  }

  /**
   * Generate and render tiles by type on the grid.
   * @param {TILE_TYPES} type - Type of tile to generate.
   */
  createTilesByType(type) {
    const nbOfTilesToCreate = this.getNumberOfTiles(type);
    const tiles = Array.from(this.tiles.values());
    let cpt = 0;
    while (cpt < nbOfTilesToCreate) {
      const tile = _.random(tiles);
      if (tile.type == DIRT) {
        cpt++;
        tile.setType(type);
        if (type == WATER) {
          const remainingWaterSize = nbOfTilesToCreate - cpt;
          const waterTiles = this.getWaterShape(tile, remainingWaterSize);
          waterTiles
            .filter((tile) => tile.type != WATER && tile.type != HOLE)
            .forEach((tile) => tile.setType(type));
          cpt += waterTiles.length;
        }
      }
    }
    if (type == SAND) {
      console.log("pouet");
      tiles
        .filter((tile) => tile.type == WATER)
        .forEach((tile) => {
          tile
            .neighbours(this.tiles)
            .filter(
              (neighbour) => neighbour.type != WATER && neighbour.type != HOLE
            )
            .forEach((neighbour) => neighbour.setType(type));
        });
    }
  }

  /**
   * Get the number of tiles by type.
   * @param {TILE_TYPES} type - Type of tile to get.
   */
  getNumberOfTiles(type) {
    return Math.trunc(type.freq * this.nbOfTiles);
  }

  /**
   * Generate and render creature's holes on the grid.
   */
  createHoles() {
    const holes = [];
    const quarter = Math.trunc(this.tilesPerSide / 4);
    const threeQuarter = Math.trunc((3 * this.tilesPerSide) / 4);
    const middle = Math.trunc(this.tilesPerSide / 2);
    this.predatorSpawn = this.tiles.get(`${middle};${middle}`);
    this.predatorSpawn.setType(HOLE, "");
    switch (this.players.length) {
      case 1:
        {
          const tile = this.tiles.get(`${quarter};${quarter}`);
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
  }

  /**
   * Get a random water shape.
   * @param {Tile} tile - Base tile to generate water shape from.
   * @param {number} remainingWaterSize - Water generation limit.
   */
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
    const randomShape = _.random(shapes);
    const tiles = randomShape.map((id) => this.tiles.get(id));
    tiles.length = Math.min(remainingWaterSize, tiles.length);

    return tiles.filter((tile) => tile != null);
  }
}

module.exports = Grid;
