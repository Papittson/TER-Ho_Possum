(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Grid = require("./src/grid.js");
new Grid([{ species: "Pouet" }]);

},{"./src/grid.js":2}],2:[function(require,module,exports){
const { TILE_TYPES } = require("./utils/constants.js");
const Tile = require("./tile.js");

class Grid {
  constructor(players, tileHeight = 30) {
    this.players = players;
    this.height = players.length < 3 ? 900 : 1500;
    this.tileHeight = tileHeight;
    this.tilesPerSide = Math.trunc(this.height / tileHeight);
    this.nbOfTiles = Math.pow(this.tilesPerSide, 2);
    this.tiles = new Map();
    this.draw();
    this.createTiles();
  }

  draw() {
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
          const remainingWaterSize = nbOfTilesToCreate - cpt;
          const waterTiles = this.getWaterShape(tile, remainingWaterSize);
          waterTiles.forEach((tile) => tile?.setType(type));
          cpt += waterTiles.length;
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
        }
        break;
      case 2:
        {
          const tile1 = this.tiles.get(`${quarter};${quarter}`);
          const tile2 = this.tiles.get(`${threeQuarter};${threeQuarter}`);
          holes.push(tile1);
          holes.push(tile2);
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
        }
        break;
      default:
        throw Error("You need to have 1 to 4 players!");
    }
    holes.forEach((hole) => hole.toHole(this.players[0].species));
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

},{"./tile.js":3,"./utils/constants.js":4}],3:[function(require,module,exports){
const { TILE_TYPES } = require("./utils/constants.js");

class Tile {
  constructor(x, y, height, type, species) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.species = species;
    this.draw(height);
  }

  draw(height) {
    this.tile = d3
      .select("#grid")
      .append("rect")
      .attr("id", `${this.x};${this.y}`)
      .attr("width", height)
      .attr("height", height)
      .attr("x", this.x * height)
      .attr("y", this.y * height)
      .attr("stroke", "black")
      //.on("click", console.log(this.tileType))
      .attr("fill", this.type.color);
  }

  setType(type) {
    this.type = type;
    this.tile.attr("fill", this.type.color);
  }

  toHole(species) {
    this.setType(TILE_TYPES.HOLE);
    this.species = species;
  }
}

module.exports = Tile;

},{"./utils/constants.js":4}],4:[function(require,module,exports){
const TILE_TYPES = Object.freeze({
  DIRT: { color: "#57392a", freq: 0.28 },
  GRASS: { color: "#57a63d", freq: 0.3, hunger: 30 },
  FOREST: { color: "#2e5935", freq: 0.15, hunger: 20 },
  ROCK: { color: "#252526", freq: 0.12 },
  WATER: { color: "#375e87", freq: 0.15, thirst: 50 },
  HOLE: { color: "#ff1313", sleep: 100 },
});

module.exports = {
  TILE_TYPES,
};

},{}]},{},[1]);
