(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { NEEDS, TILE_TYPES } = require("../utils/constants.js");
const findPath = require("../utils/shortestPathAlgo.js");

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
    this.needs = {
      HUNGER: NEEDS.HUNGER.default,
      THIRST: NEEDS.THIRST.default,
      SLEEP: NEEDS.SLEEP.default,
    };
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

  move(x, y) {
    this.x = x;
    this.y = y;
    // eslint-disable-next-line no-undef
    d3.select(`#${this.id}`)
      .attr("cx", x * this.hole.height + this.hole.height / 2)
      .attr("cy", y * this.hole.height + this.hole.height / 2);
  }

  decreaseNeeds() {
    for (const need of Object.keys(this.needs)) {
      const decreaseAmount = this.needs[need] - NEEDS[need].decreaseAmount;
      this.needs[need] = Math.max(0, decreaseAmount);
    }
  }

  increaseNeed(need, tileType) {
    if (need != null) {
      const increaseAmount = this.needs[need] + tileType[need];
      this.needs[need] = Math.min(100, increaseAmount);
    }
  }

  getCriticalNeed() {
    const sortedNeeds = Object.keys(this.needs);
    sortedNeeds.sort((a, b) => NEEDS[b].priority - NEEDS[a].priority);
    console.log("besoin rangé" + sortedNeeds);
    for (const need of sortedNeeds) {
      if (this.needs[need] < NEEDS[need].critical) {
        return need;
      }
    }
    return null;
  }

  doAction(tilesInArea) {
    const criticalNeed = this.getCriticalNeed();
    console.log("criticalneed " + criticalNeed);
    let targetType;
    switch (criticalNeed) {
      case "THIRST":
        targetType = TILE_TYPES.SAND;
        break;
    }
    console.log("targettype " + targetType);
    const tilesToExplore = new Map();
    tilesToExplore.set(`${this.x};${this.y}`, null);
    const path = findPath(
      new Map(),
      tilesToExplore,
      tilesInArea,
      undefined,
      targetType
    );
    console.log("cheminvers eau :" + path);
    if (path.length === 0) {
      // TODO Direction au hasard
      let currentTile = tilesInArea.get(`${this.x};${this.y}`);
      for (let step = 0; step < this.movespeed; step++) {
        // TODO Continuer ici
        let neighbours = currentTile.neighbours(tilesInArea);
        neighbours = neighbours.filter((tile) => !tile.isObstacle());
        currentTile = neighbours[Math.floor(Math.random() * neighbours.length)];
      }
      this.move(currentTile.x, currentTile.y);
      return true;
    } else {
      path.shift();
      for (let step = 0; step < this.movespeed; step++) {
        console.log("step " + step);
        // TODO Utiliser setTimeout avec await
        const nextStep = path.shift();
        console.log("nextStep " + nextStep);
        if (nextStep == null) {
          break;
        }
        const { x, y } = tilesInArea.get(nextStep);
        console.log("doit aller à :" + x + "," + y);
        this.move(x, y);
      }
      // The creature arrived to its goal
      if (path.length === 0) {
        console.log("soif de creature avant gloup:" + this.needs.THIRST);
        this.increaseNeed(criticalNeed, targetType);
        console.log("soif de creature apers gloup :" + this.needs.THIRST);
        return true;
      }
    }

    return false;
  }
}

module.exports = Creature;

},{"../utils/constants.js":7,"../utils/shortestPathAlgo.js":9}],2:[function(require,module,exports){
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

    let intervalId = setInterval(() => this.startRound(), 3000);
    // clearInterval(intervalId);
  }

  startRound() {
    console.log(this.constructor.name);
    // Grow dirt to grass
    this.grid.grow();
    // Do creatures' action
    for (const player of this.players) {
      for (const creature of player.creatures) {
        creature.decreaseNeeds();
        const { x, y, perception } = creature;
        const tilesInArea = this.grid.getTilesInArea(x, y, perception);
        creature.doAction(tilesInArea);
      }
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
      //.on("click", console.log(this.type.name))
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
    return this.type == TILE_TYPES.DIRT;
  }

  isObstacle() {
    return this.type == TILE_TYPES.ROCK || this.type == TILE_TYPES.WATER;
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

},{"./components/gameEngine.js":2,"./components/player.js":4,"./utils/fetchData.js":8,"./views/menu.js":10}],7:[function(require,module,exports){
const TILE_TYPES = Object.freeze({
  DIRT: { color: "#45302b", freq: 0.28 },
  GRASS: {
    name: "HERBE",
    color: "#679629",
    freq: 0.35,
    HUNGER: 30,
  },
  FOREST: {
    name: "FORET",
    color: "#155e2f",
    freq: 0.22,
    HUNGER: 20,
  },
  ROCK: { name: "ROCHER", color: "#8a8a8a", freq: 0.1 },
  WATER: {
    name: "EAU",
    color: "#3184a8",
    freq: 0.05,
  },
  SAND: {
    name: "SABLE",
    color: "#ebd9ab",
    THIRST: 50,
  },
  HOLE: {
    name: "TERRIER",
    color: "#000000",
    SLEEP: 100,
    obstacle: false,
    growable: false,
  },
});

const COLORS = ["#fcba03", "#cc0000", "#b83f18", "#7a2d9c"];

const NEEDS = Object.freeze({
  HUNGER: {
    default: 50,
    decreaseAmount: 10,
    critical: 30,
    priority: 50,
  },
  THIRST: {
    default: 50,
    decreaseAmount: 10,
    critical: 35,
    priority: 100,
  },
  SLEEP: {
    default: 50,
    decreaseAmount: 10,
    critical: 20,
    priority: 20,
  },
});

module.exports = {
  TILE_TYPES,
  COLORS,
  NEEDS,
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
      let perception = document.getElementById(`perception${i}`).value;
      perception = perception < 3 ? 2 : perception > 3 ? 6 : 4;
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
// When you call this function, you can either pass a targetId (String) OR a targetType (TILE_TYPES)
function findPath(tilesExplored, tilesToExplore, tiles, targetId, targetType) {
  let stopCondition;
  if (targetId != null) {
    stopCondition = (tileId) => tileId == targetId;
    if (tiles.get(targetId).isObstacle()) {
      console.error("The target tile is an obstacle...");
      return [];
    }
  } else if (targetType != null) {
    stopCondition = (tileId) => tiles.get(tileId).type == targetType;
  } else {
    throw new Error("You must put a target !");
  }

  while (tilesToExplore.size > 0) {
    const tileId = Array.from(tilesToExplore.keys(tilesToExplore))[0];
    tilesExplored.set(tileId, tilesToExplore.get(tileId));
    tilesToExplore.delete(tileId);

    if (stopCondition(tileId)) {
      const path = [];
      let key = tileId;
      while (key != null) {
        path.unshift(key);
        key = tilesExplored.get(key);
      }
      return path;
    }

    const neighbours = tiles.get(tileId).neighbours(tiles);
    for (let i = 0; i < neighbours.length; i++) {
      if (
        tilesExplored.has(neighbours[i].id) ||
        tilesToExplore.has(neighbours[i].id) ||
        neighbours[i].isObstacle()
      ) {
        continue;
      } else {
        tilesToExplore.set(neighbours[i].id, tileId);
      }
    }
  }

  return [];
}

module.exports = findPath;

},{}],10:[function(require,module,exports){
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
