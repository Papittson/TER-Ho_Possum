const Grid = require("./grid.js");
const { COLORS } = require("../utils/constants.js");
const Logger = require("../utils/logger.js");
const { updateInfo } = require("../views/menu.js");
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

    this.creatures = new Map();

    this.grid = new Grid(this.players);

    for (let player of this.players) {
      this.createCreature(player);
      this.createCreature(player);
    }
    this.roundCount = 0;

    let intervalId;
    intervalId = setInterval(() => this.startRound(intervalId), 500);
  }

  startRound(intervalId) {
    if (this.roundCount == 50) {
      clearInterval(intervalId);
      return;
    }

    updateInfo(this.players);
    this.roundCount++;
    Logger.log(
      "ROUND",
      `Un tour de jeu n° ${this.roundCount} commence.`,
      "#0c852c"
    );
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
          this.creatures.delete(creature.id);
          return;
        }

        const criticalNeed = creature.getCriticalNeed();
        const sendAllTiles =
          criticalNeed == "SLEEP" || criticalNeed == "MATING";
        const tilesToSend = sendAllTiles
          ? this.grid.tiles
          : this.grid.getTilesInArea(x, y, perception);

        const isActionDone = creature.doAction(tilesToSend, this.creatures);
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
              const nbNewborn = player.reproducibility;
              for (let i = 0; i < nbNewborn; i++) {
                this.createCreature(player);
              }

              hasReproduced = true;
            }
          }
        }
      });
    });
    Logger.log("ROUND", "Fin du tour de jeu.", "#0c852c");
  }

  createCreature(player) {
    const creature = new Creature(player.hole.x, player.hole.y, player);
    this.creatures.set(creature.id, creature);
    player.addCreature(creature);
  }
}

module.exports = GameEngine;
