(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
      hole,
      color,
    }
  ) {
    this.reproducibility = reproducibility;
    this.strength = strength;
    this.movespeed = movespeed;
    this.perception = perception;
    this.hole = hole;
    this.x = x;
    this.y = y;
    this.color = color;
    this.id = species + creatures.length;
    this.needsLevel = { hunger: 50, thirst: 50, energy: 50 };
    this.draw();
  }

  draw() {
    // eslint-disable-next-line no-undef
    d3.select("#grid")
      .append("circle")
      .attr("cx", this.x * this.hole.height + this.hole.height / 2)
      .attr("cy", this.y * this.hole.height + this.hole.height / 2)
      .attr("r", this.hole.height / 2 - 3)
      .attr("fill", this.color)
      .attr("class", "top")
      .attr("id", this.id);
  }

  currentTile(tiles) {
    return tiles.get(`${this.x};${this.y}`);
  }

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
      .attr("cx", x * this.hole.height + this.hole.height / 2)
      .attr("cy", y * this.hole.height + this.hole.height / 2);
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
      case "hole":
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
const Grid = require("./grid.js");
const { COLORS } = require("../utils/constants.js");
const Creature = require("./creature.js");

class GameEngine {
  setPlayers(players) {
    for (let i = 0; i < players.length; i++) {
      players[i].setColor(COLORS[i]);
    }
    this.players = players;
  }

  start() {
    if (this.players == null || !Array.isArray(this.players)) {
      throw new Error("Vous devez mettre une liste de joueurs !!!");
    }

    if (this.players.length < 1 || this.players.length > 4) {
      throw new Error("Vous devez mettre une liste de 1 à 4 joueurs !!!");
    }

    this.grid = new Grid(this.players);

    for (let player of this.players) {
      const { x, y } = player.hole;
      player.addCreature(new Creature(x, y, player));
      player.addCreature(new Creature(x, y, player));
    }
  }
}

module.exports = GameEngine;

/*function reproduce(creatures, tile) {
  var sameCre = [];
  for (let creature of creatures) {
    if (
      tile.tileType == "hole" &&
      creature.x == tile.x &&
      creature.y == tile.y
    ) {
      sameCre.push(creature);
    }
  }
  if (sameCre.length >= 2) {
    creatures.push(sameCre[0]);
  }
  return creatures;
}

function currentTile(creature, listTile) {
  //return creature.scanArea[0];
  for (let tile of listTile) {
    if (creature.x == tile.x && creature.y == tile.y) {
      return tile.tileType;
    }
  }
}*/

},{"../utils/constants.js":7,"./creature.js":1,"./grid.js":3}],3:[function(require,module,exports){
const { TILE_TYPES } = require("../utils/constants.js");
const Tile = require("./tile.js");

class Grid {
  constructor(players, tileHeight = 20) {
    this.players = players;
    this.height = players.length < 3 ? 500 : 700;
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

},{"../utils/constants.js":7,"./tile.js":5}],4:[function(require,module,exports){
class Player {
  constructor(species, reproducibility, strength, movespeed, perception) {
    this.species = species;
    this.creatures = [];
    this.reproducibility = reproducibility;
    this.strength = strength;
    this.movespeed = movespeed;
    this.perception = perception;
  }

  setHole(hole) {
    this.hole = hole;
    hole.setBorder(this.color);
  }

  setColor(color) {
    this.color = color;
  }

  addCreature(creature) {
    this.creatures.push(creature);
  }
}
module.exports = Player;

},{}],5:[function(require,module,exports){
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
    this.ticks = 0;
  }

  setBorder(color) {
    this.tile.attr("stroke", color);
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
      //.on("click", console.log(this.tileType))
      .attr("fill", this.type.color);
  }

  grow() {
    if (!this.isGrowable()) {
      return;
    }
    if (this.ticks > 1) {
      this.setType(TILE_TYPES.GRASS);
      this.ticks = 0;
    }
    this.ticks++;
  }

  isGrowable() {
    return this.type.growable;
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

},{"../utils/constants.js":7}],6:[function(require,module,exports){
const Player = require("./components/player.js");
const { changeListener } = require("./views/menu.js");
const fetchData = require("./utils/fetchData.js");
const GameEngine = require("./components/gameEngine.js");

changeListener();

function startGame() {
  const playersData = fetchData();
  const players = playersData.map(
    (data) =>
      new Player(
        data.species,
        data.reproducibility,
        data.strength,
        data.movespeed,
        data.perception
      )
  );
  const gameEngine = new GameEngine();
  gameEngine.setPlayers(players);
  gameEngine.start();
}

document.getElementById("inputs").addEventListener("submit", function (event) {
  event.preventDefault();
  document.getElementById("inputs").classList.add("non_display");
  startGame();
});

/*function gameEnginehl() {
  const grid = new Grid(players);
  const tiles = grid.tiles;
  document.getElementById("inputs").classList.add("non_display");
}

document.getElementById("inputs").addEventListener("submit", function (event) {
  event.preventDefault();
  gameEngine();
});
const Grid = require("./grid.js");
*/

},{"./components/gameEngine.js":2,"./components/player.js":4,"./utils/fetchData.js":8,"./views/menu.js":9}],7:[function(require,module,exports){
const TILE_TYPES = Object.freeze({
  DIRT: { color: "#45302b", freq: 0.28, obstacle: false, growable: true },
  GRASS: {
    color: "#679629",
    freq: 0.3,
    hunger: 30,
    obstacle: false,
    growable: false,
  },
  FOREST: {
    color: "#155e2f",
    freq: 0.15,
    hunger: 20,
    obstacle: false,
    growable: false,
  },
  ROCK: { color: "#8a8a8a", freq: 0.12, obstacle: true, growable: false },
  WATER: {
    color: "#3184a8",
    freq: 0.15,
    thirst: 50,
    obstacle: true,
    growable: false,
  },
  HOLE: { color: "#000000", sleep: 100, obstacle: false, growable: false },
});

const COLORS = ["#fcba03", "#cc0000", "#b83f18", "#7a2d9c"];

const state = Object.freeze({
  hungry: "hungry",
  sleepy: "sleepy",
  thristy: "thirsty",
  normal: "normal",
});

const criticalLevels = Object.freeze({
  hunger: 30,
  sleep: 20,
  thrist: 35,
});

module.exports = {
  TILE_TYPES,
  state,
  criticalLevels,
  COLORS,
};

},{}],8:[function(require,module,exports){
function fetchData() {
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
      players.push({
        species,
        reproducibility,
        strength,
        movespeed,
        perception,
      });
    }
  }
  return players;
}

module.exports = fetchData;

},{}],9:[function(require,module,exports){
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

},{}]},{},[6]);
