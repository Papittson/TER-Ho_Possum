const Logger = require("../utils/logger.js");
const Grid = require("./grid.js");
const Predator = require("./entities/predator.js");
const { updateInfo } = require("../views/menu.js");

class GameEngine {
  /**
   * Represents a game engine.
   * @constructor
   * @param {Player[]} players - Players entering the game.
   * @param {number} [tileSize] - Tile size (optional, default 20).
   * @param {number} [maxRounds] - Max number of rounds (optional, default 50).
   */
  constructor(players, maxRounds = 50, tileSize = 20) {
    this.players = players;
    this.creatures = [];
    this.predators = [];
    this.tileSize = tileSize;
    this.rounds = 0;
    this.maxRounds = maxRounds;
    if (this.players.length < 1 || this.players.length > 4) {
      throw new Error("The game can be played with 1 to 4 players only!");
    }
  }

  /**
   * Function that starts the game.
   */
  start() {
    this.grid = new Grid(this.players, this.tileSize);
    this.players.forEach((player) => {
      let creature = player.addCreature();
      this.creatures.push(creature);
      creature = player.addCreature();
      this.creatures.push(creature);
      const predator = new Predator(
        this.grid.predatorSpawn.x,
        this.grid.predatorSpawn.y,
        this.tileSize
      );
      this.predators.push(predator);
    });

    const gameId = setInterval(() => this.startRound(gameId), 500);
  }

  /**
   * Function that starts a new round.
   * @param {number} gameId - Game id used to stop the game (interval).
   */
  startRound(gameId) {
    if (this.rounds == this.maxRounds) {
      clearInterval(gameId);
      return;
    }
    this.rounds++;
    updateInfo(this.players);
    Logger.info(`Le tour de jeu n° ${this.rounds} commence.`);
    // Grow dirt to grass
    this.grid.grow();
    // Do creatures' action
    this.players.forEach((player) => {
      let hasReproduced = false;
      player.getCreatures().forEach((creature) => {
        const { x, y, perception } = creature;
        creature.decreaseNeeds();
        const criticalNeed = creature.getCriticalNeed();
        const sendAllTiles =
          criticalNeed == "SLEEP" || criticalNeed == "MATING";
        const tilesToSend = sendAllTiles
          ? this.grid.tiles
          : this.grid.getTilesInArea(x, y, perception);
        const creatures = this.grid.getCreaturesInArea(
          this.creatures,
          x,
          y,
          perception
        );
        const isActionDone = creature.doAction(tilesToSend, creatures);
        if (isActionDone) {
          this.grid.degrow(x, y);
          if (criticalNeed == "MATING" && !hasReproduced) {
            const mate = player
              .getCreatures()
              .find(
                (entity) =>
                  entity != creature &&
                  entity.x === x &&
                  entity.y === y &&
                  entity.getCriticalNeed() == "MATING"
              );
            if (mate != null) {
              const nbNewborn = player.reproducibility;
              for (let i = 0; i < nbNewborn; i++) {
                const newborn = player.addCreature();
                this.creatures.push(newborn);
              }

              hasReproduced = true;
            }
          }
        }
        this.creatures = this.creatures.filter((creature) => creature.isAlive);
      });
    });

    this.predators.forEach((predator) => {
      const { x, y, perception } = predator;
      const tiles = this.grid.getTilesInArea(x, y, perception);
      const creatures = this.grid.getCreaturesInArea(
        this.creatures,
        x,
        y,
        perception
      );
      predator.doAction(tiles, creatures);
      this.creatures = this.creatures.filter((creature) => creature.isAlive);
    });

    Logger.info("Fin du tour de jeu.");
  }
}

module.exports = GameEngine;
