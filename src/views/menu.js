const D3 = require("../utils/d3.js");
function displaySliders() {
  for (let i = 2; i < 5; i++) {
    document.getElementById(`player${i}`).classList.remove("hidden");
    document
      .getElementById(`speciePlayer${i}`)
      .setAttribute("required", "required");
  }
  const nbOfPlayer = document.getElementById("nbOfPlayer").value;
  for (let i = 4; i > nbOfPlayer; i--) {
    document.getElementById(`player${i}`).setAttribute("class", "hidden");
    document.getElementById(`speciePlayer${i}`).removeAttribute("required");
  }
}
function changeListener() {
  document
    .getElementById("nbOfPlayer")
    .addEventListener("change", displaySliders);
}

function updateInfo(players) {
  for (let i = 1; i <= players.length; i++) {
    D3.select(`#totalCreaturesPlayer${i}`)
      .html(` Nombre de créatures créées : ${players[i - 1].creatures.length}
      <br/>`);
    D3.select(`#totalDeadCreaturesPlayer${i}`).html(
      `Nombre de créatures mortes : ${players[i - 1].deadCreatures.length}`
    );
  }
}

function displayInfo(players) {
  for (let i = 1; i <= players.length; i++) {
    console.log(`infoPlayer${i}`);
    const div = D3.select(`#infoPlayer${i}`);
    console.log(div);
    div.classed("hidden", false); //delete the hidden class
    div.html(`Joueur ${i} <img class="icon" src="${
      players[i - 1].species
    }"/>: <br/> Vitesse de déplacement : ${players[i - 1].movespeed}
    <br/> Reproduction : ${players[i - 1].reproducibility}
    <br/> Perception : ${players[i - 1].perception} cases
    <br/> Force : ${players[i - 1].strength} <br/>`);
    div.append("span").attr("id", `totalCreaturesPlayer${i}`)
      .html(` Nombre de créatures créées : ${players[i - 1].creatures.length}
      <br/>`);
    div
      .append("span")
      .attr("id", `totalDeadCreaturesPlayer${i}`)
      .html(
        `Nombre de créatures mortes : ${players[i - 1].deadCreatures.length}`
      );
  }
}

module.exports = { changeListener, displayInfo, updateInfo };
