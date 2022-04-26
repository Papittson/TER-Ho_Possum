const Player = require("./components/player.js");
const Grid = require("./components/grid.js");
const Creature = require("./components/creature.js");
const path = require("./utils/shortestPathAlgo");
// eslint-disable-next-line no-unused-vars
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
  const player1 = players[0];
  let player2;
  if (players.length > 1) {
    player2 = players[1];
  }
  player1.addCreature(new Creature(player1.shed.x, player1.shed.y, player1));
  //player1.addCreature(new Creature(player1.shed.x, player1.shed.y, player1));
  const creature1 = player1.creatures[0];
  let arrivee;
  if (players.length > 1) {
    arrivee = player2.shed.id;
  } else {
    arrivee = "10;10";
  }

  const depart = new Map();
  const departKey = creature1.shed.id;
  depart.set(departKey, null);
  //map de string : string
  const allPath = path(new Map(), depart, arrivee, tiles);
  console.log("Allpath vaut :");
  console.log(allPath);
  //remonte de la fin jusqua larrivée
  let key = arrivee;
  let finalRoute = [tiles.get(key)];

  while (key != null) {
    finalRoute.push(tiles.get(key));
    key = allPath.get(key);
  }
  const orderedFinalRoute = finalRoute.reverse();
  console.log(orderedFinalRoute);

  for (let i = 0; i < orderedFinalRoute.length; i++) {
    if (i == 0) {
      orderedFinalRoute[i].setType(TILE_TYPES.DEPART);
    } else if (i == orderedFinalRoute.length - 1) {
      orderedFinalRoute[i].setType(TILE_TYPES.ARRIVEE);
    } else {
      orderedFinalRoute[i].setType(TILE_TYPES.CHEMIN);
    }
  }
}

document.getElementById("inputs").addEventListener("submit", function (event) {
  event.preventDefault();
  gameEngine();
});
//const Grid = require("./grid.js");
//
