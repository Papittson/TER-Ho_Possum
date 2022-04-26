(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
    return tiles.get(`${this.x};${this.y}`);
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

},{}],2:[function(require,module,exports){
const { TILE_TYPES } = require("../utils/constants.js");
const Tile = require("./tile.js");

class Grid {
  constructor(players, tileHeight = 15) {
    this.players = players;
    this.height = players.length < 3 ? 450 : 750;
    this.tileHeight = tileHeight;
    this.tilesPerSide = Math.trunc(this.height / tileHeight);
    this.nbOfTiles = Math.pow(this.tilesPerSide, 2);
    this.tiles = new Map();
    this.draw();
    this.createTiles();
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
          this.players[0].shed = tile;
        }
        break;
      case 2:
        {
          const tile1 = this.tiles.get(`${quarter};${quarter}`);
          const tile2 = this.tiles.get(`${threeQuarter};${threeQuarter}`);
          holes.push(tile1);
          holes.push(tile2);
          this.players[0].shed = tile1;
          this.players[1].shed = tile2;
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
          this.players[0].shed = tile1;
          this.players[1].shed = tile2;
          this.players[2].shed = tile2;
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
          this.players[0].shed = tile1;
          this.players[1].shed = tile2;
          this.players[2].shed = tile3;
          this.players[3].shed = tile4;
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

},{"../utils/constants.js":6,"./tile.js":4}],3:[function(require,module,exports){
// eslint-disable-next-line no-unused-vars
class Player {
  constructor(species, reproducibility, strength, movespeed, perception, shed) {
    this.species = species;
    this.creatures = [];
    this.reproducibility = reproducibility;
    this.strength = strength;
    this.movespeed = movespeed;
    this.perception = perception;
    this.shed = shed;
  }

  addCreature(creature) {
    this.creatures.push(creature);
  }
}
module.exports = Player;

},{}],4:[function(require,module,exports){
const { TILE_TYPES } = require("../utils/constants.js");

class Tile {
  constructor(x, y, height, type, species) {
    this.id = `${x};${y}`;
    this.x = x;
    this.y = y;
    this.height = height;
    this.type = type;
    this.species = species;
    this.draw(height);
  }

  draw(height) {
    // eslint-disable-next-line no-undef
    this.tile = d3
      .select("#grid")
      .append("rect")
      .attr("id", this.id)
      .attr("width", height)
      .attr("height", height)
      .attr("x", this.x * height)
      .attr("y", this.y * height)
      .attr("stroke", "black")
      //.on("click", console.log(this.tileType))
      .attr("fill", this.type.color);
  }

  isObstacle() {
    return this.type.obstacle;
  }

  neighbours(tiles) {
    const neighbours = [
      tiles.get(`${this.x - 1};${this.y}`),
      tiles.get(`${this.x + 1};${this.y}`),
      tiles.get(`${this.x};${this.y - 1}`),
      tiles.get(`${this.x};${this.y + 1}`),
    ];
    return neighbours.filter((tile) => tile != null);
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

},{"../utils/constants.js":6}],5:[function(require,module,exports){
const Player = require("./components/player.js");
const Grid = require("./components/grid.js");
const Creature = require("./components/creature.js");
const path = require("./utils/shortestPathAlgo");
const { TILE_TYPES } = require("./utils/constants.js");
const { changeListener } = require("./views/menu.js");

changeListener();

function gameEngine() {
  const nbOfPlayer = parseInt(document.getElementById("nbOfPlayer").value);
  const players = [];
  for (let i = 1; i < nbOfPlayer + 1; i++) {
    if (!document.getElementById(`player${i}`).classList.contains("hidden")) {
      const species = document.getElementById(`speciePlayer${i}`).value;
      const reproducibility = document.getElementById(
        `reproducibility${i}`
      ).value;
      const strength = document.getElementById(`strength${i}`).value;
      const movespeed = document.getElementById(`moveSpeed${i}`).value;
      const perception = document.getElementById(`perception${i}`).value;
      players.push(
        new Player(species, reproducibility, strength, movespeed, perception)
      );
    }
  }

  const grid = new Grid(players);
  const tiles = grid.tiles;
  document.getElementById("inputs").classList.add("non_display");
}

document.getElementById("inputs").addEventListener("submit", function (event) {
  event.preventDefault();
  gameEngine();
});
//const Grid = require("./grid.js");
//

},{"./components/creature.js":1,"./components/grid.js":2,"./components/player.js":3,"./utils/constants.js":6,"./utils/shortestPathAlgo":7,"./views/menu.js":8}],6:[function(require,module,exports){
const TILE_TYPES = Object.freeze({
  DIRT: { color: "#45302b", freq: 0.28, obstacle: false },
  GRASS: { color: "#679629", freq: 0.3, hunger: 30, obstacle: false },
  FOREST: { color: "#155e2f", freq: 0.15, hunger: 20, obstacle: false },
  ROCK: { color: "#8a8a8a", freq: 0.12, obstacle: true },
  WATER: { color: "#3184a8", freq: 0.15, thirst: 50, obstacle: true },
  HOLE: { color: "#b83f18", sleep: 100, obstacle: false },
  CHEMIN: { color: "#ff0000" },
  DEPART: { color: "#00ff00" },
  ARRIVEE: { color: "#0000ff" },
});

// eslint-disable-next-line no-unused-vars
const state = Object.freeze({
  hungry: "hungry",
  sleepy: "sleepy",
  thristy: "thirsty",
  normal: "normal",
});

// eslint-disable-next-line no-unused-vars
const criticalLevels = Object.freeze({
  hunger: 30,
  sleep: 20,
  thrist: 35,
});

module.exports = {
  TILE_TYPES,
  state,
  criticalLevels,
};

},{}],7:[function(require,module,exports){
//il faut lier les cases à leur parent, récuperer le chemin le plus court

// eslint-disable-next-line no-unused-vars
function path(tilesExplored, tilesToExplore, targetedTile, tiles) {
  if (!tiles.get(targetedTile).isObstacle()) {
    while (tilesToExplore.size > 0) {
      const tile = Array.from(tilesToExplore.keys(tilesToExplore))[0];
      tilesExplored.set(tile, tilesToExplore.get(tile));
      tilesToExplore.delete(tile);

      if (tile == targetedTile) {
        return tilesExplored;
      }

      const neighbours = tiles.get(tile).neighbours(tiles);
      for (let i = 0; i < neighbours.length; i++) {
        if (
          tilesExplored.has(neighbours[i].id) ||
          tilesToExplore.has(neighbours[i].id) ||
          neighbours[i].isObstacle()
        ) {
          continue;
        } else {
          tilesToExplore.set(neighbours[i].id, tile);
        }
      }
    }
    return [];
  } else {
    console.log("Erreur la case cible est un obstacle");
  }
}
module.exports = path;

},{}],8:[function(require,module,exports){
function displaySliders() {
  for (let i = 2; i < 5; i++) {
    document.getElementById(`player${i}`).classList.remove("hidden");
  }
  const nbOfPlayer = document.getElementById("nbOfPlayer").value;
  for (let i = 4; i > nbOfPlayer; i--) {
    document.getElementById(`player${i}`).setAttribute("class", "hidden");
  }
}
function changeListener() {
  document
    .getElementById("nbOfPlayer")
    .addEventListener("change", displaySliders);
}

module.exports = { changeListener };

},{}]},{},[5]);
