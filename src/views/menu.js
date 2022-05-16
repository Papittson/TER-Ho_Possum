const D3 = require("../utils/d3");

function displaySliders() {
  for (let i = 0; i < 4; i++) {
    D3.select(`#player_${i}`).classed("hidden", false);
    D3.select(`#playerSpecies_${i}`).attr("required", "required");
  }
  const nbOfPlayers = D3.select("#nbOfPlayers").property("value");
  for (let i = 3; i > nbOfPlayers - 1; i--) {
    D3.select(`#player_${i}`).attr("class", "hidden");
    D3.select(`#playerSpecies_${i}`).attr("required", null);
  }
}

function changeListener() {
  D3.select("#nbOfPlayers").on("change", displaySliders);
  for (let i = 0; i < 4; i++) {
    const select = D3.select(`#playerSpecies_${i}`);
    const currentValue = select.property("value");
    select.datum(currentValue);
    select.on("change", () => updateSelect(i));
  }
}

function updateSelect(selectNum) {
  const select = D3.select(`#playerSpecies_${selectNum}`);
  const oldValue = select.datum();
  const selectValue = select.property("value");
  for (let i = 0; i < 4; i++) {
    const options = D3.select(`#playerSpecies_${i}`).selectChildren("option");
    options.each(function () {
      const option = D3.select(this);
      if (option.property("value") == oldValue) {
        option.attr("hidden", undefined);
      }
      if (
        option.property("value") == selectValue &&
        option.property("value") != ""
      ) {
        option.attr("hidden", true);
      }
    });
  }
  select.datum(selectValue);
}

function updateInfo(players) {
  for (let i = 0; i < players.length; i++) {
    D3.select(`#totalCreaturesPlayer_${i}`)
      .html(` Nombre de créatures créées : ${players[i].creatures.length}
      <br/>`);
    D3.select(`#totalDeadCreaturesPlayer_${i}`).html(
      `Nombre de créatures vivantes : ${players[i].getCreatures().length}`
    );
  }
}

function displayInfo(players) {
  for (let i = 0; i < players.length; i++) {
    const div = D3.select(`#infoPlayer_${i}`);
    div.classed("hidden", false); //delete the hidden class
    div.html(`Joueur ${i + 1} <img class="icon" src="${
      players[i].img
    }"/>: <br/> Vitesse de déplacement : ${players[i].moveSpeed}
    <br/> Reproduction : ${players[i].reproducibility}
    <br/> Perception : ${players[i].perception} cases
    <br/> Force : ${players[i].strength} <br/>`);
    div.append("span").attr("id", `totalCreaturesPlayer_${i}`)
      .html(` Nombre de créatures créées : ${players[i].creatures.length}
      <br/>`);
    div
      .append("span")
      .attr("id", `totalDeadCreaturesPlayer_${i}`)
      .html(
        `Nombre de créatures vivantes : ${players[i].getCreatures().length}`
      );
  }
}

module.exports = { changeListener, displayInfo, updateInfo };
