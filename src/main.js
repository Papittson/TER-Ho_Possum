const Player = require("./components/player.js");
const { changeListener, displayInfo } = require("./views/menu.js");
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
  displayInfo(players);
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
