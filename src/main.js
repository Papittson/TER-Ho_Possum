const Player = require("./player.js");
const Grid = require("./grid.js");
const Creature = require("./creature.js");
const path = require("./shortestPath2");
function displaySliders() {
  for (let i = 2; i < 5; i++) {
    document.getElementById(`player${i}`).classList.remove("hidden");
  }
  const nbOfPlayer = document.getElementById("nbOfPlayer").value;
  for (let i = 4; i > nbOfPlayer; i--) {
    document.getElementById(`player${i}`).setAttribute("class", "hidden");
  }
}
document
  .getElementById("nbOfPlayer")
  .addEventListener("change", displaySliders);

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
  console.log(players);
  document.getElementById("inputs").classList.add("non_display");
  const player1 = players[0];
  player1.addCreature(new Creature(player1.shed.x, player1.shed.y, player1));
  //player1.addCreature(new Creature(player1.shed.x, player1.shed.y, player1));
  const creature1 = player1.creatures[0];
  console.log(path([], [creature1.currentTile(tiles)], tiles["10;21"], tiles));
}

document.getElementById("inputs").addEventListener("submit", function (event) {
  event.preventDefault();
  gameEngine();
});
//const Grid = require("./grid.js");
//
