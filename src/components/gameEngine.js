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
