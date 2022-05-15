const D3 = require("../utils/d3.js");
function displaySliders() {
  for (let i = 1; i < 4; i++) {
    document.getElementById(`player_${i}`).classList.remove("hidden");
    document
      .getElementById(`speciePlayer_${i}`)
      .setAttribute("required", "required");
  }
  const nbOfPlayer = document.getElementById("nbOfPlayer").value;
  for (let i = 3; i > nbOfPlayer; i--) {
    document.getElementById(`player_${i}`).setAttribute("class", "hidden");
    document.getElementById(`speciePlayer_${i}`).removeAttribute("required");
  }
}
function changeListener() {
  document
    .getElementById("nbOfPlayer")
    .addEventListener("change", displaySliders);
}

function updateInfo(players) {
  for (let i = 1; i <= players.length; i++) {
    D3.select(`#totalCreaturesPlayer_${i + 1}`)
      .html(` Nombre de créatures créées : ${players[i].creatures.length}
      <br/>`);
    D3.select(`#totalDeadCreaturesPlayer_${i + 1}`).html(
      `Nombre de créatures mortes : ${players[i].deadCreatures.length}`
    );
  }
}

function displayInfo(players) {
  for (let i = 0; i < players.length; i++) {
    const div = D3.select(`#infoPlayer_${i}`);

    div.classed("hidden", false); //delete the hidden class
    div.html(`Joueur ${i + 1} <img class="icon" src="${
      players[i].species
    }"/>: <br/> Vitesse de déplacement : ${players[i].movespeed}
    <br/> Reproduction : ${players[i].reproducibility}
    <br/> Perception : ${players[i].perception} cases
    <br/> Force : ${players[i].strength} <br/>`);
    div.append("span").attr("id", `totalCreaturesPlayer_${i}`)
      .html(` Nombre de créatures créées : ${players[i].creatures.length}
      <br/>`);
    div
      .append("span")
      .attr("id", `totalDeadCreaturesPlayer_${i}`)
      .html(`Nombre de créatures mortes : ${players[i].deadCreatures.length}`);
  }
}

module.exports = { changeListener, displayInfo, updateInfo };
