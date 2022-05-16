const D3 = require("./utils/d3");
const GameEngine = require("./components/gameEngine.js");
const Player = require("./components/player.js");
const { changeListener, displayInfo } = require("./views/menu.js");
const { fetchFormData } = require("./utils/functions.js");

function startGame() {
  const data = fetchFormData();
  const maxRounds = data.maxRounds;
  const players = data.players.map((playerData) => new Player(playerData));
  const gameEngine = new GameEngine(players, maxRounds);
  displayInfo(players);
  gameEngine.start();
}

changeListener();

D3.select("#inputs").on("submit", (event) => {
  event.preventDefault();
  D3.select("#inputs").classed("non_display", true);
  startGame();
});
