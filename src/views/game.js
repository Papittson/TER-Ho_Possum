const D3 = require("../utils/d3");
const detailsTemplate = require("./templates/details.js");

// Create player details in the main section
function renderDetails(players) {
  for (let playerId = 0; playerId < players.length; playerId++) {
    const container = D3.select(`#details_${playerId}`);
    container.html(detailsTemplate(players[playerId], playerId));
  }
  updateDetails(players);
}

function updateDetails(players) {
  for (let playerId = 0; playerId < players.length; playerId++) {
    const player = players[playerId];
    const creaturesSize = player.creatures.length;
    const alivesSize = player.getCreatures().length;
    const creaturesHtmlElem = D3.select(`#creatures_${playerId}`);
    const alivesHtmlElem = D3.select(`#alives_${playerId}`);
    creaturesHtmlElem.html(creaturesSize);
    alivesHtmlElem.html(alivesSize);
  }
}

module.exports = {
  renderDetails,
  updateDetails,
};
