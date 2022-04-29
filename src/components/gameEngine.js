const Grid = require("./grid.js");
const { COLORS } = require("../utils/constants.js");
const Logger = require("../utils/logger.js");

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
      player.addCreature();
      player.addCreature();
    }

    setInterval(() => this.startRound(), 500);
  }

  startRound() {
    Logger.log("ROUND", "Un tour de jeu commence.", "#0c852c");
    // Grow dirt to grass
    this.grid.grow();
    // Do creatures' action
    this.players.forEach((player) => {
      let hasReproduced = false;
      player.creatures.forEach((creature) => {
        const { x, y, perception } = creature;
        creature.decreaseNeeds();

        if (!creature.isAlive()) {
          player.addDeadCreature(creature);
          return;
        }

        const criticalNeed = creature.getCriticalNeed();
        const sendAllTiles =
          criticalNeed == "SLEEP" || criticalNeed == "MATING";
        const tilesToSend = sendAllTiles
          ? this.grid.tiles
          : this.grid.getTilesInArea(x, y, perception);

        const isActionDone = creature.doAction(tilesToSend);
        if (isActionDone) {
          this.grid.degrow(creature.x, creature.y);
          if (criticalNeed == "MATING" && !hasReproduced) {
            const mate = player.creatures.find(
              (entity) =>
                entity != creature &&
                entity.x === creature.x &&
                entity.y === creature.y &&
                entity.getCriticalNeed() == "MATING"
            );
            if (mate != null) {
              player.addCreature();
              hasReproduced = true;
            }
          }
        }
      });
    });
    Logger.log("ROUND", "Fin du tour de jeu.", "#0c852c");
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
