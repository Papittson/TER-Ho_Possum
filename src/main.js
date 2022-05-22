const GameEngine = require("./components/gameEngine.js");
const Player = require("./components/player.js");
const fetchFormData = require("./views/form.js");
const { renderDetails } = require("./views/game.js");

function startGame(data) {
  const maxRounds = data.maxRounds;
  const players = data.players.map((playerData) => new Player(playerData));
  const gameEngine = new GameEngine(players, maxRounds);
  gameEngine.start();
  renderDetails(players);
}

fetchFormData().then((data) => {
  startGame(data);
});
