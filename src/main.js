const Player = require("./components/player.js");
const { changeListener } = require("./views/menu.js");
const fetchData = require("./utils/fetchData.js");
const GameEngine = require("./components/gameEngine.js");

changeListener();
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

function launch() {
  const gameEngine = new GameEngine();
  gameEngine.setPlayers(players);
  gameEngine.start();
}

document.getElementById("inputs").addEventListener("submit", function (event) {
  event.preventDefault();
  launch();
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
